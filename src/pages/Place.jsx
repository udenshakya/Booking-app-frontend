import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FaTableCells } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";
import { server } from "./Home";

const Place = () => {
  const [place, setPlace] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  useEffect(() => {
    const fetchPlace = async () => {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data);
      console.log(data);
    };
    fetchPlace();
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className=" absolute inset-0 mx-auto w-full min-h-screen">
        <div className="grid gap-2 p-4">
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex fixed gap-2 my-3 py-2 px-3 items-center rounded-lg bg-gray-300 hover:bg-gray-400 transition-all "
            >
              <IoMdClose className="text-xl" />
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className=" mx-auto ">
                <img
                  src={`${server}/uploads/` + photo}
                  alt="img"
                  className="h-screen w-screen object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  const bookThisPlace = async () => {
    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
      setFormValid(false);
      return;
    }

    // Reset the form validation state
    setFormValid(true);

    try {
      const response = await axios.post("/bookings", {
        place: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        price: numberOfNights * place.price,
        name,
        phone,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/booking`);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="mt-6 p-4 bg-gray-100">
        <h1 className="text-2xl">{place.title}</h1>
        <a target="_blank" href={"https://maps.google.com/?q=" + place.address}>
          {place.address}{" "}
        </a>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="grid gap-2 grid-cols-[2fr_1fr] ">
          <div>
            <img
              className="aspect-square object-cover h-full w-full"
              src={`${server}/uploads/` + place.photos?.[0]}
              alt="img"
            />
          </div>
          <div className="grid ">
            <img
              className="aspect-square object-cover"
              src={`${server}/uploads/` + place.photos?.[1]}
              alt="img"
            />
            <img
              className="aspect-square object-cover relative top-2 overflow-hidden"
              src={`${server}/uploads/` + place.photos?.[2]}
              alt="img"
            />
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex justify-center items-center gap-2 rounded-xl absolute right-3 bottom-3 px-2 py-1 bg-gray-100 shadow-md "
        >
          <IoMdPhotos />
          Show all photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-6 gap-8">
        <div>
          <div className="mb-4">
            <h1 className="font-bold text-xl mt-3">Description</h1>
            <p>{place.description} </p>
          </div>
          <span className="font-bold"> Check-In:</span>
          {place.checkIn}
          <br />
          <span className="font-bold">Check-Out:</span>
          {place.checkOut}
          <br />
          <span className="font-bold">Max number of guests:</span>
          {place.maxGuests} <br />
        </div>

        <div className=" bg-gray-50  shadow-lg  p-4 rounded-lg">
          <h1 className="text-xl text-center">
            Price: ${place.price}/per night
          </h1>
          <div className="flex">
            <div className="mt-5 mr-2 px-4 border rounded-lg">
              <label>Check In:</label>
              <input
                type="date"
                value={checkIn}
                required
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="mt-5 px-4 border rounded-lg">
              <label>Check Out:</label>
              <input
                type="date"
                value={checkOut}
                required
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 px-4 py-2 border">
            <label>Number of Guests</label>
            <br />
            <input
              className="w-full border rounded-lg p-1"
              type="number"
              value={numberOfGuests}
              required
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>

          <>
            <div className="mt-5 px-4 py-2 border">
              <label>Your Full Name:</label>
              <br />
              <input
                className="w-full border rounded-lg p-1"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-5 px-4 py-2 border">
              <label>Phone number:</label>
              <br />
              <input
                className="w-full border rounded-lg p-1"
                type="number"
                value={phone}
                required={true}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {!formValid && (
              <p className="text-red-500 mt-2">All fields are required</p>
            )}
            {error && (
              <p className="text-red-500 mt-2">{error.response.data.error} </p>
            )}
          </>

          <button
            onClick={bookThisPlace}
            className="bg-red-600 w-full rounded-xl px-5 py-3 mt-5  text-white "
          >
            Book This Place
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl mt-3">Extra Info</h1>
        <p className="text-sm">{place.extraInfo} </p>
      </div>
    </div>
  );
};

export default Place;
