import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/applogo.png";
import useLocalStorage from "use-local-storage";
import { resetAppointments } from "../reducers/appointmentSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [userId, setUserId] = useLocalStorage("userId", null);
  const email = localStorage.getItem("email");
  const cleanedEmail = email.replace(/['"]+/g, "");

  const handleLogout = () => {
    auth.signOut();
    setUserId(null);
    dispatch(resetAppointments());
  };
  if (!currentUser && userId == null) {
    navigate("*");
  }

  return (
    <nav className='border-gray-200 border-b'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center'>
          <img src={logo} className='h-8 ml-3' alt='Flowbite Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'></span>
        </a>
        <div className='flex flex-row justify-center items-center gap-5'>
          <p className='font-semibold text-gray-800 hidden sm:flex'>
            {cleanedEmail}
          </p>
          <button
            onClick={handleLogout}
            type='button'
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:red:ring-purple-900'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
