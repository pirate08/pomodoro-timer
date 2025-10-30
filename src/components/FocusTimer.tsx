'use client';

import ProgressBar from '@/ui/ProgressBar';
import React, { useState, useEffect, useRef } from 'react';
import { RiResetLeftLine } from 'react-icons/ri';
import { IoIosPause } from 'react-icons/io';
import { VscDebugStart } from 'react-icons/vsc';
import { useSound } from 'react-sounds';

const TOTAL_SECONDS = 25 * 60;

const FocusTimer = () => {
  const [start, setStart] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_SECONDS);

  // ✅ Add a ref to track if session was already saved
  const sessionSaved = useRef(false);

  // Initialize sound hooks
  const { play: playStartSound } = useSound('notification/info');
  const { play: playResetSound } = useSound('notification/popup');
  const { play: playPauseSound } = useSound('ui/blocked');
  const { play: playCountdownSound } = useSound('arcade/coin');

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
    } else if (timeLeft === 0 && !sessionSaved.current) {
      // ✅ Only run if session hasn't been saved yet
      sessionSaved.current = true; // Mark as saved

      playCountdownSound();
      setIsRunning(false);
      setStart(false);

      // --Store session count--
      const sessionCount = Number(localStorage.getItem('focusSessions') || 0);
      const newSessionCount = sessionCount + 1;
      localStorage.setItem('focusSessions', newSessionCount.toString());

      // ✅ Store cycle count (every 4 sessions = 1 cycle)
      if (newSessionCount % 4 === 0) {
        const cycleCount = Number(localStorage.getItem('cyclesDone') || 0);
        localStorage.setItem('cyclesDone', (cycleCount + 1).toString());
      }

      // ✅ Refresh the page after session ends
      setTimeout(() => {
        window.location.reload();
      }, 500); // Small delay to ensure sound plays and data is saved
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
    sessionSaved.current = false;
  };

  // --Progress bar calculation
  const progress = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

  return (
    <div className='flex flex-col items-center justify-center text-white h-full mt-10'>
      {/* --Progressbar-- */}
      <div>
        <ProgressBar
          time={formatTime(timeLeft)}
          label='Focus Time'
          progress={progress}
        />
      </div>
      {/* --Buttons-- */}
      <div className='mt-6 flex gap-4'>
        <button
          onClick={() => handleStartPause()}
          className='text-2xl text-white bg-orange-500 hover:bg-orange-600 rounded-full p-4 cursor-pointer hover:scale-105 transition-transform duration-200'>
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
