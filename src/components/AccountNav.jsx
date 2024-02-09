import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiListBullets } from "react-icons/pi";
import { LuHotel } from "react-icons/lu";


const AccountNav = () => {
    const location =  useLocation()
    const pathnameParts = location.pathname.split('/');

    const subpages = pathnameParts[2];
  return (
    <div>
            <nav className='flex justify-center items-center mt-8 md:gap-5 '>
        <Link to={'/account/profile'} className={`flex justify-center items-center gap-1 rounded-full px-4 py-2  ${subpages==='profile'?'text-white bg-red-600':'bg-gray-200'  } `} ><MdOutlineAccountCircle />
 My Profile</Link>
        <Link to={'/account/booking'} className={`flex justify-center items-center gap-1 rounded-full px-4 py-2  ${subpages==='booking'?'text-white bg-red-600':'bg-gray-200'  } `} ><PiListBullets />
 My Bookings</Link>
        <Link to={'/account/places'} className={`flex justify-center items-center gap-1 rounded-full px-4 py-2  ${subpages==='places'?'text-white bg-red-600':'bg-gray-200'  } `} ><LuHotel />
 My accommodations</Link>
      </nav>

    </div>
  );
}

export default AccountNav;
