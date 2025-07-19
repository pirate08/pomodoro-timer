import React from 'react';
import ItemBar from '../ui/ItemBar';

const PomodoroTimer = () => {
  return (
    <div className='font-sans flex flex-col gap-8 justify-start h-full items-center p-10 pb-10 '>
      {/* --Title and Paragraph-- */}
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-bold text-center'>
          Pomodoro Timer
        </h1>
        <p className='text-sm md:text-[15.8px] text-center text-gray-300'>
          Stay focused, take breaks, be productive
        </p>
      </div>
      {/* --Box goes here-- */}
      <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl py-10 px-6 w-full max-w-xl text-white'>
        <ItemBar />
      </div>
      {/* --End Paragraph-- */}
      <div>
        <p className='text-md text-gray-400 text-center w-full md:max-w-xl mx-auto'>
          💡 Tip: Focus for 25 minutes, then take a 5-minute break. Every 4
          sessions, take a longer break!
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
