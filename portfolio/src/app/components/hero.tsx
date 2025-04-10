"use client";
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@/app/assets/Hero Animation.json';

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='h-screen w-screen p-4 flex'>
        <div className='w-1/3 m-4'>
          <div className='h-[25%]'></div>
          <div className='h-[50%] w-[90%] m-2 p-10 rounded-4xl text-shadow-lg'><span className='text-2xl hover:[110%]'>👋</span> Hello! My name is <span className='text-bold text-blue-400 text-center'><br/> Kishore Shanmugam</span> </div>
        </div>
        <div className='w-2/3 m-4'>
          <Lottie animationData={animationData} className="h-full" loop={true}/>
        </div>
    </div>
  )
}

export default Hero;
