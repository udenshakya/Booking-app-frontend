import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiWifiOn } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { PiTelevisionSimple } from "react-icons/pi";
import { FaRadio } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { GiEntryDoor } from "react-icons/gi";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { server } from "../pages/Home";

const PlacesForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState("");
  const [formValid, setFormValid] = useState(true);


  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchPlaces() {
      const { data } = await axios.get(`/places/${id}`);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setPhotoLink(data.photoLink);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price)
    }
    fetchPlaces();
  }, [id]);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  const handleCheck = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)]);
    }
  };

  const validateForm = () => {
    // Check if any required fields are empty
    if (!title || !address || addedPhotos.length === 0 || !description || perks.length === 0 || !checkIn || !checkOut || maxGuests <= 0 || price <= 0) {
      setFormValid(false);
      return false;
    }
    setFormValid(true);
    return true;
  };

  const savePlace = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const placeData = {
      title,
      address,
      addedPhotos,
      photoLink,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    if (id) {
      await axios.put("/places", { id, ...placeData });
      setRedirect("/account/places");
    } else {
      await axios.post("/places", placeData);
      setRedirect("/account/places");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const removePhoto = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    const addedPhotosWithoutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    setAddedPhotos(newAddedPhotos);
    
  };

  return (
    <div>
      <form className="mt-6 " onSubmit={savePlace}>
        <h1 className="text-xl ">Title</h1>
        <p className="text-gray-400 text-sm">
          Title for your place should be short and catchy
        </p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 w-full mt-3"
          placeholder="Title,example:My lovely apartment"
        />

        <h1 className="text-xl mt-2">Address</h1>
        <p className="text-gray-400 text-sm">Address of the place</p>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border px-2 py-1 w-full mt-3"
          placeholder="Address"
        />

        <h1 className="text-xl mt-2">Photos</h1>
        <p className="text-gray-400 text-sm">More=Better</p>
        <div className="flex   gap-1 ">
          <input
            type="text"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            className="border px-2 py-1 w-full mt-3"
            placeholder="Add using a link"
          />
          <button
            onClick={addPhotoByLink}
            className="rounded-lg py-1 px-2 bg-gray-200"
          >
            Add&nbsp;photo
          </button>
        </div>
        <div className="grid mt-2 h-30   gap-2 grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="relative " key={link}>
                <img
                  className="flex justify-center items-center h-full  w-full overflow-hidden rounded-xl object-contain"
                  src={`${server}/uploads/${link}`}
                />
                <div>
                  <button
                    onClick={(e) => removePhoto(e, link)}
                    className="absolute cursor-pointer text-white bottom-4 right-2 bg-black/40 p-1 rounded-lg "
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    onClick={(e) => selectAsMainPhoto(e, link)}
                    className="absolute cursor-pointer text-white bottom-4 left-2 bg-black/40 p-1 rounded-lg "
                  >
                    {link === addedPhotos[0] ? (
                      <MdOutlineStar />
                    ) : (
                      <MdOutlineStarBorder />
                    )}
                  </button>
                </div>
              </div>
            ))}
          <label className="h-24  flex cursor-pointer justify-center items-center border px-4 py-4 rounded-lg mt-3 gap-1 w-32">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <button className="flex justify-center items-center cursor-pointer">
              <IoCloudUploadOutline />
            </button>
            Upload
          </label>
        </div>

        <h1 className="text-xl mt-2">Description</h1>
        <p className="text-gray-400 text-sm">Description of the place</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-2 py-1 w-full mt-3"
        />

        <h1 className="text-xl mt-2">Perks</h1>
        <p className="text-gray-400 text-sm">
          Select all the perks of your place
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex gap-1 border items-center px-3 py-2">
            <input
              type="checkbox"
              checked={perks.includes("wifi")}
              name="wifi"
              onChange={handleCheck}
            />
            <CiWifiOn />
            <p>Wifi</p>
          </div>
          <div className="flex gap-1 border items-center px-3 py-2">
            <input
              type="checkbox"
              checked={perks.includes("parking")}
              name="parking"
              onChange={handleCheck}
            />
            <FaCar />
            <p>Free Parking</p>
          </div>
          <div className="flex gap-1 border items-center px-3 py-2">
            <input
              type="checkbox"
              checked={perks.includes("tv")}
              name="tv"
              onChange={handleCheck}
            />
            <PiTelevisionSimple />
            <p>TV</p>
          </div>
          <div className="flex gap-1 border items-center px-3 py-2">
            <input
              type="checkbox"
              checked={perks.includes("radio")}
              name="radio"
              onChange={handleCheck}
            />
            <FaRadio />
            <p>Radio</p>
          </div>
          <div className="flex gap-1 border items-center px-3 py-2">
            <input
              type="checkbox"
              checked={perks.includes("pets")}
              name="pets"
              onChange={handleCheck}
            />
            <MdOutlinePets />
            <p>Pets</p>
          </div>
          <div className="flex gap-1 border items-center px-3 py-2">
            <input
              type="checkbox"
              checked={perks.includes("entrance")}
              name="entrance"
              onChange={handleCheck}
            />
            <GiEntryDoor />
            <p>Private Entrance</p>
          </div>
        </div>
        <h1 className="text-xl mt-2">Extra info</h1>
        <p className="text-gray-400 text-sm">House rules,etc</p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className="border px-2 py-1 w-full mt-3"
        />

        <h1 className="text-xl mt-3">Check in&out times</h1>
        <p className="text-gray-400 text-sm"> Add check in and out time</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-3">
          <div>
            <h2>Check in time</h2>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border px-2 py-1 w-full "
              placeholder="14:00"
            />
          </div>
          <div>
            <h2>Check out time</h2>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border px-2 py-1 w-full "
            />
          </div>
          <div>
            <h2>Max number of guests</h2>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="border px-2 py-1 w-full "
              placeholder="3"
            />
          </div>
        </div>
        <div>
            <h2>Price per night</h2>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border px-2 py-1 w-full "
              placeholder="3"
            />
          </div>
          {!formValid && (
          <p className="text-red-500 mt-2">All fields are required</p>
        )}

        <button
          type="submit"
          className="bg-red-600 mt-4 rounded-full px-4 py-2 w-full text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesForm;
