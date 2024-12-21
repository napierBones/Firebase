'use client'
import Navbar from '@/app/Components/Navbar';
import Hero from '@/app/Components/Hero';
import AddCheckinBar from '@/app/Components/AddCheckinBar';
import CardCheckin from '@/app/Components/CardCheckin';
import PopUpAddCheckin from '@/app/Components/PopUpAddCheckin';
import useStore from '@/store/useStore';

export default function Home() {
  const { isPopupAddCheckinVisible } = useStore();
  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <Hero />
      <AddCheckinBar />
      <CardCheckin />
      {isPopupAddCheckinVisible && (<PopUpAddCheckin />)}
    </div>
  );
}
