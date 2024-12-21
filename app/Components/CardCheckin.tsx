import Image from 'next/image';
import React from 'react';

function CardCheckin() {
  return (
    <div className="flex flex-wrap w-full">
    <div className="border shadow-lg p-5 flex flex-col items-start justify-center w-1/4 rounded-lg gap-3">
        <div className="w-full">
            <Image className='rounded-lg' src="/c1.jpeg" alt="" width={580} height={386} />
        </div>
      <p className="font-bold">Check In Name</p>
      <p className="text-slate-500">12th Dec, 2023</p>
      <p className='flex flex-row items-center gap-2 font-bold'>
      
          <Image className='rounded-full' src="/user.jpg" alt="" width={20} height={20} />
 
        Owner: James
      </p>
    </div>
    </div>
  );
}

export default CardCheckin;
