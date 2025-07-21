'use client';

import React, { useEffect, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

const Sessions = () => {
  const [focusSessions, setFocusSessions] = useState<number>(0);
  const [cyclesDone, setCyclesDone] = useState<number>(0);

  useEffect(() => {
    const sessions = Number(localStorage.getItem('focusSessions') || '0');
    const cycles = Number(localStorage.getItem('cyclesDone') || '0');
    setFocusSessions(sessions);
    setCyclesDone(cycles);

    // Listen for storage changes (if you use multiple tabs/windows)
    const syncStorage = () => {
      setFocusSessions(Number(localStorage.getItem('focusSessions') || '0'));
      setCyclesDone(Number(localStorage.getItem('cyclesDone') || '0'));
    };

    window.addEventListener('storage', syncStorage);
    return () => window.removeEventListener('storage', syncStorage);
  }, []);

  return (
    <div>
      <div className='flex justify-around items-center w-full'>
        {/* --Focus Session-- */}
        <div className='flex flex-col items-center'>
          <span className='text-2xl font-semibold'>{focusSessions}</span>
          <h4 className='text-md font-extralight'>Focus Sessions</h4>
        </div>
        {/* --Cycles Done-- */}
        <div className='flex flex-col items-center'>
          <span className='text-2xl font-semibold'>{cyclesDone}</span>
          <h4 className='text-md font-extralight'>Cycles Done</h4>
        </div>
      </div>
      <div className='flex justify-center items-center gap-1 text-md text-white mt-4 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer hover:scale-105'>
        {/* --Icon-- */}
        <span>
          <IoSettingsOutline />
        </span>
        {/* --Button to reset-- */}
        <button
          onClick={() => {
            localStorage.removeItem('focusSessions');
            localStorage.removeItem('cyclesDone');
            location.reload();
          }}
          className=' cursor-pointer'>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sessions;
