import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const registerUser=async(e)=>{
    e.preventDefault()
    try {
      await axios.post('/register',{
        name,
        email,
        password
      })
      alert("registration complete")
      return navigate("/login")
      
      
    } catch (error) {
      alert("registration failed")
      
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 ">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={registerUser} className="flex flex-col gap-3 max-w-md mx-auto w-full  ">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="py-2 px-4 border rounded-3xl w-full"
          placeholder="John Doe"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="py-2 px-4 border rounded-3xl"
          placeholder="your@email.com"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="py-2 px-4 border rounded-3xl"
          placeholder="password"
        />
        <button
          type="submit"
          className="rounded-3xl bg-red-600 px-4 py-2 text-white"
        >
          Register
        </button>
        <div className="text-center">
          Already a member?
          <Link to={"/login"} className="underline"> Login
          </Link>{" "}
        </div>
      </form>
    </div>
  );
};

export default Register;
