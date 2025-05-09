import React, { useState, useEffect } from 'react';

const Circles = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`concentric-circles-container ${animate ? 'animate-pulse-slow' : ''}`}>
      <div className="concentric-circle circle-outer"></div>
      <div className="concentric-circle circle-middle"></div>
      <div className="concentric-circle circle-inner"></div>
    </div>
  );
};

export default Circles;