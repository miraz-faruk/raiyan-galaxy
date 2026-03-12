import React, { useState, useEffect } from "react";
import GalaxyBackground from "./GalaxyBackground";

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // This timer waits 5 seconds and then hides the welcome message
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="relative h-screen overflow-hidden text-white bg-black">
      {/* Background stays active throughout */}
      <GalaxyBackground />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {showWelcome ? (
          /* SECTION 1: The Welcome Message */
          <h1 className="text-6xl font-bold animate-pulse transition-opacity duration-1000">
            Hi Raiyan!
          </h1>
        ) : (
          /* SECTION 2: The Main Content (Appears after 5s) */
          <div className="flex flex-col items-center gap-10 animate-fade-in">
            <h1 className="text-5xl font-bold text-center">
              Welcome to Raiyan's Galaxy 🚀
            </h1>

            <div className="flex gap-8">
              {/* Added daisyUI-like hover effects for extra fun */}
              <button className="bg-red-500 hover:bg-red-600 hover:scale-110 transition-all px-8 py-4 rounded-xl text-xl font-bold shadow-lg">
                AI Search
              </button>

              <button className="bg-green-500 hover:bg-green-600 hover:scale-110 transition-all px-8 py-4 rounded-xl text-xl font-bold shadow-lg">
                Talking Tom
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;