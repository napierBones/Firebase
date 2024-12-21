import { AiOutlineBars } from 'react-icons/ai';

export default function AddCheckinBar() {
  return (
    <div className="w-full p-5 flex flex-row justify-between items-center">
      <h1 className=" w-fit text-xl font-bold">Added Checkins</h1>
      <AiOutlineBars size={30} />
    </div>
  );
}
