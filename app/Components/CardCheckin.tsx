'use client';
import useStore from '@/store/useStore';
import { collection, getDocs } from '@firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import db from '../firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

interface CheckIn {
  id: string; // Document ID
  image: string; // URL of the image
  rooms: number; // Number of rooms
  guests: number; // Number of guests
  title: string; // Title of the check-in
  date: string;
}

function CardCheckin() {
  const [user] = useAuthState(auth);
  const [checkIn, setCheckIn] = useState<CheckIn[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'checkin'));
      const checkInData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // The Firestore document ID
        date: doc.data().createdAt.toDate().toDateString(),
        ...doc.data(), // The document fields
      })) as CheckIn[];
      console.log('createdobjec', checkInData);
      setCheckIn(checkInData);
      console.log('checkInData', checkInData);
    };
    fetchData();
  }, []);
  const { togglePopupDetailsCheckin } = useStore();
  const handleClick = (id: string) => {
    togglePopupDetailsCheckin(id); // Pass the check-in ID to your store action
  };
  return (
    <div
      className="flex flex-wrap w-full cursor-pointer gap-5 justify-around"
      
    >
      {checkIn.map((checkIn, index) => (
        <div
          key={index}
          className="border shadow-lg p-5 flex flex-col items-start justify-center w-1/4 rounded-lg gap-3"  onClick={() => handleClick(checkIn.id)}
        >
          <div className="w-full">
            <Image
              className="rounded-lg"
              src={checkIn.image}
              alt=""
              width={580}
              height={386}
            />
          </div>
          <p className="font-bold">{checkIn.title}</p>
          <p className="text-slate-500">{checkIn.date}</p>
          <p className="flex flex-row items-center gap-2 font-bold">
            <Image
              className="rounded-full"
              src="/user.jpg"
              alt=""
              width={20}
              height={20}
            />

            {user ? 'Owner : ' + user.displayName : 'James'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CardCheckin;
