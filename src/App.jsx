import axios from "axios";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./UserContext";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));
const PlacesForm = lazy(() => import("./components/PlacesForm"));
const Place = lazy(() => import("./pages/Place"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const BookingsPage = lazy(() => import("./pages/BookingsPage"));


axios.defaults.baseURL = "https://booking-app-server-mv8v.onrender.com";
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
      <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <div className="container my-4 mx-auto px-3">
          <Nav />
          <Routes >
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/account/:subpages?" element={<Account />} />
            <Route exact path="/account/:subpages/new" element={<PlacesForm />} />
            <Route exact path="/account/places/:id" element={<PlacesForm />} />
            <Route exact path="/place/:id" element={<Place />} />
            <Route exact path="/account/booking/" element={<BookingsPage />} />
            <Route exact path="/account/booking/:id" element={<BookingPage />} />


          </Routes>
          <Footer/>
        </div>
        </Suspense>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
