import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      setUser(response.data)
      alert("login success");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 ">
      <h1 className="text-2xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-md mx-auto w-full  "
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-2 px-4 border rounded-3xl"
          placeholder="your@email.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 px-4 border rounded-3xl"
          placeholder="password"
        />
        <button
          type="submit"
          className="rounded-3xl bg-red-600 px-4 py-2 text-white"
        >
          Login
        </button>
        <div className="text-center">
          Don't have an account yet?{" "}
          <Link to={"/register"} className="underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
Login;
