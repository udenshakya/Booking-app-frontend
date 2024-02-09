import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Nav = () => {
  const {user} = useContext(UserContext)

  return (
    <header>
      <nav className="flex justify-between items-center ">
          <Link to="/" className="flex gap-2 justify-center items-center">
            <img className="h-6 " src="/logo.png" alt="logo" />
            <h1 className="font-bold text-lg">airnbn</h1>
          </Link>
        <div className="md:flex hidden border-2 rounded-full  md:gap-4 px-2 lg:px-4 py-2 shadow-md hover:scale-[1.02] transition-all">
          <button className="">Anywhere</button>
          <div className="border-l border-1 border-gray-400"></div>
          <button>Any week</button>
          <div className="border-l border-1 border-gray-400"></div>

          <button>Add guests</button>
          <button className="flex justify-center items-center text-white bg-red-600 rounded-full p-2">
            <CiSearch />
          </button>
        </div>
        <div>
          <div className="flex gap-5 justify-center items-center">
            <h1 className="md:block hidden">Airbnb your home</h1>
            <Link to={user ? "/account/profile":"/login"} className="flex justify-center items-center gap-2 rounded-full border-2 px-4 py-2 shadow-md hover:scale-[1.02] transition-all">
              <button className="">
                <GiHamburgerMenu />
              </button>
              {!!user && (
                <div>
                  {user.name}
                </div>
              )}
              <button>
                <div className="relative ">
                  <CgProfile className="text-3xl " />
                  <div className="bg-red-500 rounded-full absolute right-0 top-0 h-3 w-3 flex justify-center text-sm items-center ">
                    1
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
