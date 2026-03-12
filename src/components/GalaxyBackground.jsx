import React, { useMemo } from 'react';

const GalaxyBackground = () => {
  // We generate the stars ONCE using useMemo
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1 + "px",
      // We use CSS variables to pass random values safely
      duration: 3 + Math.random() * 4 + "s",
      delay: Math.random() * 5 + "s",
      opacity: 0.2 + Math.random() * 0.8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      {/* Deep Space Background Color */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black opacity-80" />

      {/* Star Field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.duration,
            animationDelay: star.delay,
            boxShadow: `0 0 ${star.size} white`,
          }}
        />
      ))}

      {/* Nebula Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
    </div>
  );
};

export default GalaxyBackground;