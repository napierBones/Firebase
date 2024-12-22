import { FC } from 'react';
import Image from 'next/image';
import { Timestamp } from '@firebase/firestore';

interface DetailsFormProps {
  id: string;
  img: string;
  rooms: number;
  guests: number;
  date: Timestamp;
}

const DetailsForm: FC<DetailsFormProps> = ({ id, img, rooms, guests, date }) => {
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <div className="flex flex-row justify-between p-5">
          <p>Booking ID</p>
          <div className="border px-3">{id || '#123456789'}</div>
        </div>
        <div className="flex flex-row justify-between p-5">
          <p>Rooms</p>
          <div className="border px-3">{rooms || '1'}</div>
        </div>
        <div className="flex flex-row justify-between p-5">
          <p>No. of Guests</p>
          <div className="border px-3">{guests || '1'}</div>
        </div>
        <div className="flex flex-row justify-between p-5">
          <p>Booked Date</p>
          <div className="border px-3">{date.toDate().toDateString() || '1/1/2023'}</div>
        </div>
      </div>
      <div className="w-1/2 p-5">
        <Image
          src={img || '/c1.jpeg'}
          alt="Booking Image"
          width={580}
          height={386}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default DetailsForm;
