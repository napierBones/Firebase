'use client';
import useStore from '@/store/useStore';
import React, { useState } from 'react';
import { MdWavingHand } from 'react-icons/md';

const Hero = () => {
  const { togglePopupAddCheckin } = useStore();
  return (
    <div className="relative bg-[url('/hero.jpeg')] bg-cover bg-[0%_85%] h-64 p-10 rounded-2xl flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50 z-0 rounded-2xl"></div>

      <h1 className="text-4xl text-white flex flex-row gap-2 relative z-10">
        Hi!
        <span>
          <MdWavingHand color="yellow" />
        </span>
        James
      </h1>
      <p className="text-white relative z-10">
        Want to check in? Feel free to click the{' '}
        <span className="text-yellow-400 font-bold">Add Checkin</span> button
      </p>
      <button
        className="bg-purple-500 py-2 px-5 w-fit rounded-full text-white relative z-10"
        onClick={togglePopupAddCheckin}
      >
        Add Checkin
      </button>
    </div>
  );
};

export default Hero;
