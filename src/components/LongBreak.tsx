'use client';

import React, { useState, useEffect } from 'react';
import ProgressBar from '@/ui/ProgressBar';
import { RiResetLeftLine } from 'react-icons/ri';
import { IoIosPause } from 'react-icons/io';
import { VscDebugStart } from 'react-icons/vsc';
import { useSound } from 'react-sounds';

const TOTAL_SECONDS = 15 * 60;

const LongBreak = () => {
  const [start, setStart] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_SECONDS);

  // Initialize sound hooks
  const { play: playStartSound } = useSound('notification/info');
  const { play: playResetSound } = useSound('notification/popup');
  const { play: playPauseSound } = useSound('ui/blocked');
  const { play: playCountdownSound } = useSound('arcade/coin');

  // --Effect to handle timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;

          if (newTime <= 5 && newTime > 0) {
            playCountdownSound();
          }

          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      playCountdownSound();
      setIsRunning(false);
      setStart(false);
      setTimeLeft(TOTAL_SECONDS);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, playCountdownSound]);

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

  // --Handle reset
  const handleReset = () => {
    playResetSound();
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
          label='Long Break'
          progress={progress}
        />
      </div>
      {/* --Buttons-- */}
      <div className='mt-6 flex gap-4'>
        <button
          onClick={() => handleStartPause()}
          className='text-2xl text-white bg-blue-500 hover:bg-blue-600 rounded-full p-4 cursor-pointer hover:scale-105 transition-transform duration-200'>
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

export default LongBreak;
