import React from 'react';
import ItemBar from '../ui/ItemBar';

const PomodoroTimer = () => {
  return (
    <div className='font-sans flex flex-col gap-10 justify-start h-screen items-center p-10 pb-10 '>
      {/* --Title and Paragraph-- */}
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-center'>
          Pomodoro Timer
        </h1>
        <p className='text-sm md:text-lg text-center text-gray-300'>
          Stay focused, take breaks, be productive
        </p>
      </div>
      {/* --Box goes here-- */}
      <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg py-10 px-6 w-full max-w-xl text-white'>
        <ItemBar />
      </div>
    </div>
  );
};

export default PomodoroTimer;
