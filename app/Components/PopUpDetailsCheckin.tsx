import useStore from '@/store/useStore';
import React, { useEffect, useState } from 'react';
import DetailsForm from './DetailsForm';
import { doc, getDoc, Timestamp  } from '@firebase/firestore';
import db from '../firebase/firestore';

interface CheckInData {
  rooms: number;
  title: string;
  createdAt: Timestamp;
  image: string;
  guests: number;
}


export default function PopUpDetailsCheckin() {
  const { togglePopupDetailsCheckin,  PopupDetailsCheckinId} = useStore();
  const handleClick = () => {
    togglePopupDetailsCheckin(); 
  };
  const [checkinDetails, setCheckinDetails] = useState<CheckInData | undefined>(undefined);;

  useEffect(() => {
    const fetchCheckinDetails = async () => {
      if (!PopupDetailsCheckinId) return;

      try {
        const docRef = doc(db, 'checkin', PopupDetailsCheckinId); // Reference the document
        const docSnap = await getDoc(docRef); 
        console.log('docSnap', docSnap);
        console.log('docSnapdata', docSnap.data());

        if (docSnap.exists()) {
          setCheckinDetails(docSnap.data()as CheckInData)
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchCheckinDetails();
  }, [PopupDetailsCheckinId]);

  if (!checkinDetails) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0 flex flex-row items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white size-fit rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center justify-between bg-slate-600 bg-opacity-5  p-3">
        <h2 className="">Detail</h2>
        <button
          onClick={() => handleClick()}
          className="px-2 flex flex-row items-center justify-center"
        >
          x
        </button>
      </div>

  <DetailsForm id={PopupDetailsCheckinId} img={checkinDetails.image} rooms={checkinDetails.rooms} guests={checkinDetails.guests} date={checkinDetails.createdAt} />
     
    </div>
  </div>
  );
}
