"use client";
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@/app/assets/Hero Animation.json';

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='h-screen w-screen p-4 flex'>
        <div className='w-1/3 m-4 border-2'>
          <div className='h-[25%]'></div>
          <div className='h-[50%] w-[90%] m-2 p-4 text-2xl rounded-4xl text-blue-200 border-1 border-dashed '>Hello </div>
        </div>
        <div className='w-2/3 m-4 border-2'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, ullam illo. Inventore vero libero debitis enim blanditiis rerum ipsa ipsam quisquam architecto illum reiciendis officia, culpa, fugiat itaque vel ducimus.
        </div>
    </div>
  )
}

export default Hero;
