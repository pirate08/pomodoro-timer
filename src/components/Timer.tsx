'use client';

import ProgressBar from '@/ui/ProgressBar';
import React, { useState, useEffect } from 'react';
import { RiResetLeftLine } from 'react-icons/ri';
import { IoIosPause } from 'react-icons/io';
import { VscDebugStart } from 'react-icons/vsc';
import { useSound } from 'react-sounds';

const TOTAL_SECONDS = 86400;

const Timer = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  // Initialize sound hooks
  const { play: playStartSound } = useSound('notification/info');
  const { play: playResetSound } = useSound('notification/popup');
  const { play: playPauseSound } = useSound('ui/blocked');

  // Handle timer start and pause
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timePassed < TOTAL_SECONDS) {
      interval = setInterval(() => {
        setTimePassed((prev) => prev + 1);
      }, 1000);
    } else if (timePassed >= TOTAL_SECONDS) {
      setIsRunning(false);
      setStart(false);
      setTimePassed(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, timePassed]);

  // Format time in HH : MM : SS
  const formatTime = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h} : ${m} : ${s}`;
  };

  // Handle start and pause with sound effects
  const handleStartPause = () => {
    if (!start) {
      // Starting the timer
      playStartSound();
    } else {
      // Pausing the timer
      playPauseSound();
    }
    setStart(!start);
    setIsRunning(!isRunning);
  };

  // Handle reset with sound effect
  const handleReset = () => {
    playResetSound();
    setIsRunning(false);
    setTimePassed(0);
    setStart(false);
  };

  return (
    <div className='flex flex-col items-center justify-center text-white h-full mt-10'>
      {/* --Progressbar-- */}
      <div>
        <ProgressBar
          time={formatTime(timePassed)}
          label='Timer'
          progress={(timePassed / TOTAL_SECONDS) * 100}
        />
      </div>
      {/* --Buttons-- */}
      <div className='mt-6 flex gap-4'>
        <button
          onClick={() => handleStartPause()}
          className='text-2xl text-white bg-yellow-500 hover:bg-yellow-600 rounded-full p-4 cursor-pointer hover:scale-105 transition-transform duration-200'>
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

export default Timer;
