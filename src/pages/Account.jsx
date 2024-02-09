import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPLage from './PlacesPLage';
import AccountNav from '../components/AccountNav';



const Account = () => {
    const {user,ready,setUser}= useContext(UserContext)
    const [redirect, setRedirect] = useState(null);

    const {subpages} = useParams()

    if(!ready){
        return "loading.."
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    const handleLogout=async()=>{
      await axios.post('/logout')
      setRedirect('/')
      setUser(null)

    }

    if(redirect){
      return <Navigate to={redirect} />
    }


  return (
    <div className=''>
      <AccountNav />
      {subpages === 'profile' &&(
        <div className='flex flex-col mx-auto w-1/3  mt-4 text-center'>
          <p className='w-full'>
          Logged in as <span className='font-bold'>Name</span>: {user.name}<br/> <span className='font-bold'>Email</span>: {user.email} 

          </p>

          <button onClick={handleLogout} className='mt-4 px-4 py-2 text-white rounded-full bg-red-600 '>Logout</button>

        </div>
      )}
      {subpages === 'places' && (
        <PlacesPLage />
      )}
    </div>
  );
}

export default Account;
