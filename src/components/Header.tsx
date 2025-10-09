import shareIcon from "../assets/share.png";
import shareIconHover from "../assets/share-hoover.png";
import copyIcon from "../assets/copy.png";
import closeIcon from "../assets/close.png";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Header = () => {
  // const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = "https://www.cinderreels.com/";

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const closeModal = () => {
    setShowShareModal(false);
    setCopied(false);
  };
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-20 md:py-[22px] py-[30px] pr-4 md:pr-[80px]">
        <div className="flex justify-end gap-8">
          <div className="flex items-center gap-6">
            {/* <button
              className="bg-[#354b63] hover:bg-white text-white hover:text-[#4A90E2] flex items-center justify-center gap-2 w-[100px] h-[40px] md:w-[179px] md:h-[56px] rounded-[20px] md:rounded-[116px]"
              onClick={()=>{
                navigate("/privacy-policy")
              }}
            >
              <span className="font-['Montserrat'] font-semibold text-[12.8px] md:text-base">
              Privacy Policy
              </span>
            </button> */}
            <button
              className="bg-[#4A90E2] hover:bg-white text-white hover:text-[#4A90E2] flex items-center justify-center gap-2 w-[100px] h-[40px] md:w-[179px] md:h-[56px] rounded-[20px] md:rounded-[116px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleShareClick}
            >
              <img
                src={isHovered ? shareIconHover : shareIcon}
                className="w-3 h-3 md:w-4 md:h-4 transition-all"
              />
              <span className="font-['Montserrat'] font-semibold text-[12.8px] md:text-base">
                Share
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>

          <div className="absolute md:top-[95px] md:right-[80px] md:w-[323px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:left-auto bg-[#1E1E1E] border border-[#2E2E2E] rounded-[14px] p-6 w-[calc(100%-2rem)] max-w-md">
            <div className="flex justify-center items-center mb-6 relative">
              <h2 className="text-white font-['Montserrat'] font-bold text-[20px]">
                Share
              </h2>
              <button
                onClick={closeModal}
                className="hover:opacity-70 absolute right-0 transition-opacity"
              >
                <img src={closeIcon} alt="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-[#2E2E2E] rounded-lg">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full bg-transparent text-white px-4 py-3 font-['Montserrat'] text-sm outline-none"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className="bg-[#4A90E2] hover:bg-[#3A7BC8] px-3 py-3 flex items-center justify-center min-w-[50px] rounded-lg transition-colors"
              >
                <img src={copyIcon} alt="Copy" className="w-6 h-6" />
              </button>
            </div>

            {copied && (
              <p className="text-green-400 text-sm mt-2 font-['Montserrat']">
                Link copied to clipboard!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
