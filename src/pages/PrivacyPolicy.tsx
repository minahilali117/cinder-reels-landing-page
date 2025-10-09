import heroBg from "../assets/hero bg.png";
import { policyData } from "../data/policyData";
import { useEffect } from "react";
const PrivacyPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [1])

  return (
    <div>
      <div className="relative w-screen overflow-x-hidden" >
        <div className="relative md:h-screen w-screen flex items-center justify-center m-0 p-0 md:pt-20 pt-[90px] font-['Montserrat'] pb-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="text-center text-white z-10 px-2 md:px-8 max-w-sm md:max-w-5xl relative">
            <h1 className="font-bold text-[44px] md:text-[68px] tracking-wide mb-8 md:mb-4">
              Privacy Policy
            </h1>

            <p className="font-['Montserrat'] font-semibold text-[16px] mb-4 md:mb-8">
              CinderReels values your privacy and is committed to protecting
              your personal data. This Privacy & Cookie Policy explains how we
              collect, use, and safeguard your information when you visit{" "}
              <span>
                <a
                  href="www.cinderreels.com"
                  className="text-[#4A90E2]"
                  target="_blank"
                >
                  www.cinderreels.com
                </a>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#0E0E0E] text-white py-[40px] md:py-20 font-['Montserrat'] md:px-28">
        <div className="bg-[#1E1E1E] text-white py-[40px] md:py-20 px-4 md:px-28 font-['Montserrat'] rounded-3xl space-y-14">
          {policyData.map((section, index) => (
            <div key={index} className="space-y-5">
              <p className="font-bold text-[26px]">{section.title}</p>
              <p className={`text-[16px] whitespace-pre-line ${index === policyData.length - 1 ? "text-[#57BCFF] font-medium" : ""}`}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-[#0E0E0E] border-t-[1px] border-[#3C3C3C] md:px-6 space-y-4'>
          <div className="text-center pt-[24px]  md:pt-[30px] font-normal text-sm text-white pb-[27px] md:pb-[44px]"> © 2025 Cinder Reels. All rights reserved.</div>
        </div>
    </div>
  );
};

export default PrivacyPolicy;
