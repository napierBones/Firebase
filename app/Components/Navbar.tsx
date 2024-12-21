import Image from 'next/image';
import { CiBellOn } from 'react-icons/ci';
import { GoInfo } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  return (
    <div className="w-full rounded-full p-5 shadow-sm border flex flex-row justify-between">
      <h1 className="bg-purple-500 p-2 w-fit text-white">Logo</h1>
      <div className="flex flex-row items-center gap-3">
        <h1 className="bg-purple-500 py-2 px-5 w-fit rounded-full text-white">
          Feedback
        </h1>
        <CiBellOn size={40} />
        <GoInfo size={30} />
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/user.jpg"
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />
          <IoIosArrowDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;