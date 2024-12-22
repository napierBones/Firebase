'use client';

import Hero from '@/app/Components/Hero';
import AddCheckinBar from '@/app/Components/AddCheckinBar';
import CardCheckin from '@/app/Components/CardCheckin';
import PopUpAddCheckin from '@/app/Components/PopUpAddCheckin';
import useStore from '@/store/useStore';
import PopUpDetailsCheckin from '@/app/Components/PopUpDetailsCheckin';



export default function Home() {
  const {
    isPopupAddCheckinVisible,
    isPopupDetailsCheckinVisible,

  } = useStore();





  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <AddCheckinBar />
      <CardCheckin />
      {isPopupAddCheckinVisible && <PopUpAddCheckin />}
      {isPopupDetailsCheckinVisible && <PopUpDetailsCheckin />}
    </div>
  );
}
