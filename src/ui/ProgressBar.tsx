import React from 'react';

interface ProgressBarProps {
  time: any;
  label: string;
  progress: number;
}

const ProgressBar = ({ time, label, progress }: ProgressBarProps) => {
  // Calculate the stroke dash offset based on the progress
  const strokeDasharray = 283;
  const strokeDashOffset = strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <div>
      {/* --Circle Ui-- */}
      <div className='relative'>
        <svg
          className='w-[280px] h-[280px] transform -rotate-90'
          viewBox='0 0 100 100'>
          <circle
            cx='50'
            cy='50'
            r='45'
            stroke='#725c82'
            strokeWidth='3'
            fill='none'
          />
          <circle
            cx='50'
            cy='50'
            r='45'
            stroke='#111827'
            strokeWidth='3'
            fill='none'
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashOffset}
            strokeLinecap='round'
          />
        </svg>
        <div className='absolute inset-0 flex items-center flex-col justify-center'>
          <h1 className='text-4xl font-bold text-white mb-6'>{time}</h1>
          <h1 className='text-sm bg-white/10 hover:bg-white/20 text-white hover:text-black border cursor-pointer border-white/30 px-5  rounded-full backdrop-blur-sm transition-colors duration-200'>
            {label}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
