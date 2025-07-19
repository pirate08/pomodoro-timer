'use client';

import ProgressBar from '@/ui/ProgressBar';
import React, { useState, useEffect } from 'react';
import { RiResetLeftLine } from 'react-icons/ri';
import { IoIosPause } from 'react-icons/io';
import { VscDebugStart } from 'react-icons/vsc';

const TOTAL_SECONDS = 25 * 60;

const FocusTimer = () => {
  const [start, setStart] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_SECONDS);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setStart(false);
      setTimeLeft(TOTAL_SECONDS);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // --Format time in MM : SS
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m} : ${s}`;
  };

  // --Handle start and pause
  const handleStartPause = () => {
    setStart(!start);
    setIsRunning(!isRunning);
  };

  // --Handle reset
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_SECONDS);
    setStart(false);
  };

  // --Progress bar calculation
  const progress = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

  return (
    <div className='flex flex-col items-center justify-center text-white h-full mt-10'>
      {/* --Progressbar-- */}
      <div>
        <ProgressBar
          time={formatTime(timeLeft)}
          label='Focus Timer'
          progress={progress}
        />
      </div>
      {/* --Buttons-- */}
      <div className='mt-6 flex gap-4'>
        <button
          onClick={() => handleStartPause()}
          className='text-2xl text-white bg-orange-500 hover:bg-orange-600 rounded-full p-4 cursor-pointer'>
          {start ? <IoIosPause /> : <VscDebugStart />}
        </button>
        <button
          onClick={() => handleReset()}
          className='text-2xl text-white bg-white/10 hover:bg-white/20 rounded-full p-4 cursor-pointer'>
          <RiResetLeftLine />
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
