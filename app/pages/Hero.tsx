"use client";
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

const Hero = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the Lottie animation JSON file from the public folder
    fetch('/Lottie Animation/Hero Animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Set this after fetching
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className=' w-full h-full object-contain'>
      <div className='border-black'>
      {animationData && (
        <Lottie 
          options={defaultOptions}
          height={700}
          width={700}
          
        />
      )}
    </div>
      
    </div>

    
    
  );
}

export default Hero;
