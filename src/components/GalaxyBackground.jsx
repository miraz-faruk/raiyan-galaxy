import React, { useMemo } from 'react';

const GalaxyBackground = () => {
  // useMemo runs this once and "remembers" the stars
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3}px`,
      duration: `${2 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      {/* Deep Space Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-black to-blue-900/10" />
      
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
          }}
        />
      ))}

      {/* Ambient Nebulas */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]" />
    </div>
  );
};

export default GalaxyBackground;