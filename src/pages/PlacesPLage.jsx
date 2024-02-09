import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { server } from "./Home";

const PlacesPLage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/places");
        const { data } = response;
        setPlaces(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching places:", error);
        // Handle the error (e.g., show a message to the user)
      }
    };

    fetchData();
  }, []);
  return (
    <div className="">
      <Link
        to={"/account/places/new"}
        className="flex justify-center items-center w-[200px] mx-auto my-6 gap-1 bg-red-600 rounded-full px-4 py-2 text-white "
      >
        <span className="text-md ">
          <FaPlus />
        </span>
        Add new place
      </Link>
      {places.length > 0 &&
        places.map((place) => (
            <Link to={`/account/places/${place._id} `} key={place._id} className="flex mt-2 gap-2 p-2 rounded-lg bg-gray-200">
              <div className="flex  w-[13rem] h-32">
                {place.photos.length > 0 && (
                  <img className="object-cover rounded-lg h-full w-full" src={`${server}/uploads/`+place.photos[0]} alt="img" />
                )}
              </div>
              <div className="ml-4  w-[80%]">
                <h1 className="font-bold">{place.title}</h1>
                <p>{place.description}</p>
              </div>
            </Link>
        ))}
    </div>
  );
};

export default PlacesPLage;
