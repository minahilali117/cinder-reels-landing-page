import { useRef, useState, useEffect } from 'react';
// import Vid from '../assets/CinderReels Holding page video (revised).mp4';
import Thumbnail from '../assets/thumbnail.png';
import Enlarge from '../assets/enlarge.png';

const Video = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    

    useEffect(() => {
        let timeout: number;
        if (isPlaying) {timeout = setTimeout(() => {setShowButton(false);}, 4000);
        } else { setShowButton(true); }
        return () => clearTimeout(timeout);}, [isPlaying]);

    const handlePlayClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
                setShowButton(true); // Force show button when paused
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleVideoPause = () => {
        setIsPlaying(false);
        setShowButton(true); // Always show button when video is paused
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
    };


    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const seekTime = (parseFloat(e.target.value) / 100) * duration;
        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
        }
    };


    const handleFullscreen = () => {
        if (videoRef.current) {
            // For iOS Safari, try webkitEnterFullscreen first
            if ('webkitEnterFullscreen' in videoRef.current) {
                try {
                    (videoRef.current as any).webkitEnterFullscreen();
                } catch (error) {
                    console.log('webkitEnterFullscreen failed:', error);
                }
            }
            // Fallback to standard fullscreen API
            else if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen().catch(error => {
                    console.log('requestFullscreen failed:', error);
                });
            }
            // Additional fallback for other webkit browsers
            else if ('webkitRequestFullscreen' in videoRef.current) {
                try {
                    (videoRef.current as any).webkitRequestFullscreen();
                } catch (error) {
                    console.log('webkitRequestFullscreen failed:', error);
                }
            }
        }
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="flex items-center justify-center relative bg-black max-h-[200px] md:min-h-screen pb-[40px] px-[20px] md:px-[100px] overflow-hidden" 
             onClick={() => setShowButton(true)} 
             onMouseEnter={() => setShowButton(true)}
             style={{ touchAction: 'pan-y' }}>
            <video ref={videoRef} className="relative md:w-full h-full object-cover z-0 rounded-[8.3px] md:rounded-3xl" loop poster={Thumbnail} onEnded={() => { setIsPlaying(false); }} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onPause={handleVideoPause} onPlay={handleVideoPlay} playsInline>
              <source src="https://cinderreels.s3.us-east-1.amazonaws.com/CinderReels+Holding+page+video+(revised).mp4" type="video/mp4"/> ur browser does not support the video tag  
            </video>

            {/* play/pause */}
            <button onClick={handlePlayClick} className={`h-[33px] w-[33px] md:h-[80px] md:w-[80px] flex items-center justify-center absolute rounded-full bg-opacity-50 bg-black hover:bg-opacity-30 transition-all z-10 ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {!isPlaying ? (
                <div className="w-0 h-0 border-l-[10px] md:border-l-[20px] border-l-white border-t-[6px] md:border-t-[12px] border-t-transparent border-b-[6px] md:border-b-[12px] border-b-transparent ml-1"></div>
              ) : (
                <div className="flex gap-1">
                  <div className="w-[3px] h-[10px] md:w-[6px] md:h-[20px] bg-white"></div>
                  <div className="w-[3px] h-[10px] md:w-[6px] md:h-[20px] bg-white"></div>
                </div>
              )}
            </button>

              {/*progress bar for mobile view */}
            <div className={`md:hidden absolute bottom-[35px] left-[24px] right-[24px] transition-all ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={handleSeek}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    className="w-full h-[6px] rounded-[35px] appearance-none cursor-pointer bg-[#31313180] touch-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:bg-[#4A90E2] [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:w-[10px] [&::-moz-range-thumb]:h-[10px] [&::-moz-range-thumb]:bg-[#4A90E2] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
                />
                <div className="flex items-center justify-between">
                    <div className="text-white text-[10px] font-semibold font-['Montserrat']">
                        {Math.floor((duration - currentTime) / 60)}:{String(Math.floor((duration - currentTime) % 60)).padStart(2, '0')}
                    </div>
                    <button 
                        onClick={handleFullscreen} className="flex items-center justify-center p-2 -m-2"> <img src={Enlarge} className="w-[20px] h-[20px]" />
                    </button>
                </div>
            </div>

            {/*progress bar for desktop view */}
            <div className={`hidden md:block absolute bottom-[60px] left-[110px] right-[110px] transition-all ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <input type="range" min="0" max="100" value={progress} onChange={handleSeek} className="w-full h-[8px] rounded-[35px] appearance-none cursor-pointer bg-[#31313180] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:bg-[#4A90E2] [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:w-[16px] [&::-moz-range-thumb]:h-[16px] [&::-moz-range-thumb]:bg-[#4A90E2] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"/>
                <div className="flex items-center justify-between mt-2">
                    <div className="text-white text-[14px] font-semibold font-['Montserrat']">
                        {Math.floor((duration - currentTime) / 60)}:{String(Math.floor((duration - currentTime) % 60)).padStart(2, '0')}
                    </div>
                    <button 
                        onClick={handleFullscreen} className="flex items-center justify-center p-2 -m-2"> <img src={Enlarge} className="w-[28px] h-[28px]" />
                    </button>
                </div>
            </div>
        </div>

    );
};
export default Video;
