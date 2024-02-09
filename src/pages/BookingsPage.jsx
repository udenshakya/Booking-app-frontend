import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import { format } from "date-fns";
import { server } from "./Home";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/bookings");
      setBookings(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <AccountNav />
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <div className="flex rounded-lg bg-gray-100 overflow-hidden p-3 gap-4 mt-4">
            <img className="w-52 rounded-md" src={`${server}/uploads/` + booking.place?.photos?.[0]} />
            <div>
              <h2>{booking.place.title} </h2>
              <p>{format(new Date(booking.checkIn),'yyyy-MM-dd' )} to {format(new Date(booking.checkOut),'yyyy-MM-dd' )}  </p>
              <p>Total Price: ${booking.price} </p>
          </div>
          </div>
        ))}
    </div>
  );
};

export default BookingsPage;
