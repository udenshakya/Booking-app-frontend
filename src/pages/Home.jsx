import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// export const server = "http://localhost:4000"
export const server = "https://booking-app-server-mv8v.onrender.com"

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`${server}/allPlaces`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6 ">
      {places.length > 0 &&
        places.map((place) => (
            <Link to={'/place/'+place._id} className="bg-gray-100 rounded-xl group" key={place._id}>
              {place.photos?.[0] && (
                <div className="relative">
                  <img
                    className="rounded-2xl h-60 w-full object-cover"
                    src={`${server}/uploads/` + place.photos?.[0]}
                    alt="img"
                  />
                  <div className="absolute top-2 right-2 text-xl ">
                    <CiHeart />
                  </div>
                  <div className="absolute   top-[50%] right-0 text-sm rounded-full bg-white p-1 group-hover:block hidden cursor-pointer">
                    <FaChevronRight />
                  </div>
                </div>
              )}
              <div>
                <div className=" flex justify-between">
                  <h3 className="font-bold">{place.title}</h3>

                  <p>rating </p>
                </div>
                <h2 className=" ">{place.address}</h2>
                <div>
                  <span className="font-bold"> ${place.price} </span> per night{" "}
                </div>
              </div>
            </Link>
        ))}
    </div>
  );
};

export default Home;
