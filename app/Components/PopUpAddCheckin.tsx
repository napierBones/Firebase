import useStore from '@/store/useStore';
import React from 'react';

export default function PopUpAddCheckin() {
  const { togglePopupAddCheckin } = useStore();
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0 flex flex-row items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white size-96 rounded-xl overflow-hidden">
        <div className="flex flex-row items-center justify-between bg-slate-600 bg-opacity-5  p-3">
          <h1>Add Checkin</h1>
          <button
            className="px-2 flex flex-row items-center justify-center"
            onClick={togglePopupAddCheckin}
          >
            x
          </button>
        </div>
        <form action="">
            
        </form>
      </div>
    </div>
  );
}
