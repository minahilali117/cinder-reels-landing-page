import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 }); // valid for 1 year
    setShowBanner(false);
  };

  const declineCookies = () => {
    Cookies.set("cookieConsent", "false", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-black px-5 py-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 shadow-[0_-2px_8px_rgba(0,0,0,0.1)] z-50">
      {/* Text */}
      <p className="text-base md:text-lg max-w-3xl text-center md:text-left">
        We use cookies to improve your experience. By continuing, you agree to our{" "}
        <a href="/privacy-policy" className="text-[#57BCFF] underline font-medium">
          Privacy Policy
        </a>.
      </p>

      {/* Buttons */}
      <div className="mt-4 md:mt-0 flex gap-4">
        <button
          onClick={acceptCookies}
          className="bg-[#57BCFF] hover:bg-[#4aa8e6] text-white font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Accept
        </button>
        <button
          onClick={declineCookies}
          className="bg-gray-200 hover:bg-gray-300 text-black font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
