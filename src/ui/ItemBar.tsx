'use client';

import React, { useState } from 'react';
import Timer from '@/components/Timer';
import FocusTimer from '@/components/FocusTimer';
import ShortBreak from '@/components/ShortBreak';
import LongBreak from '@/components/LongBreak';

type TabLabel = 'Timer' | 'Focus Time' | 'Short Break' | 'Long Break';

type ItemBarItem = {
  id: number;
  label: TabLabel;
};

const itemBarItems: ItemBarItem[] = [
  { id: 1, label: 'Timer' },
  { id: 2, label: 'Focus Time' },
  { id: 3, label: 'Short Break' },
  { id: 4, label: 'Long Break' },
];

const ItemBar = () => {
  const [selected, setSelected] = useState<string>('Focus Time');

  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
        {itemBarItems.map((item) => {
          const isActive = selected === item.label;

          let activeBg = '';
          if (isActive) {
            switch (item.label) {
              case 'Focus Time':
                activeBg = 'bg-orange-600 hover:bg-orange-700 text-white';
                break;
              case 'Short Break':
                activeBg = 'bg-green-700 hover:bg-green-800 text-white';
                break;
              case 'Long Break':
                activeBg = 'bg-blue-700 hover:bg-blue-800 text-white';
                break;
              default:
                activeBg = 'bg-yellow-600 hover:bg-yellow-700 text-white';
            }
          } else {
            activeBg =
              'bg-white/10 hover:bg-white/20 text-white hover:text-black';
          }

          return (
            <div
              key={item.id}
              onClick={() => setSelected(item.label)}
              className={`border cursor-pointer border-white/30 px-3 py-1 rounded-md backdrop-blur-sm transition-colors duration-200 ${activeBg}`}>
              <h1 className='text-sm'>{item.label}</h1>
            </div>
          );
        })}
      </div>

      {/* Render components - Timer persists, others are conditional */}
      <div>
        {/* Timer component - always mounted, just hidden when not selected */}
        <div className={selected === 'Timer' ? 'block' : 'hidden'}>
          <Timer />
        </div>

        {/* Other components - conditionally rendered (will reset when switching) */}
        {selected === 'Focus Time' && <FocusTimer />}
        {selected === 'Short Break' && <ShortBreak />}
        {selected === 'Long Break' && <LongBreak />}
      </div>
    </div>
  );
};

export default ItemBar;
