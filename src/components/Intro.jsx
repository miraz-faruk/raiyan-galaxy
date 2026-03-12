import { useEffect } from "react";

const Intro = ({ onFinish }) => {

  useEffect(() => {
    setTimeout(() => {
      onFinish();
    }, 5000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white text-7xl font-bold">
      Hi Raiyan!
    </div>
  );
};

export default Intro;