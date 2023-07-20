import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/fflogo.png";
import glogo from "../assets/google-logo.png";
import { useDispatch } from "react-redux";
import { setAdmin } from "../reducers/appointmentSlice";

export default function LoginPage() {
  const [failedMessage, setFailedMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (currentUser) navigate("/dashboard");

    if (!currentUser && userId == null) {
      navigate("*");
    }
  }, [currentUser, userId, navigate]);

  // reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, username);
    } catch (error) {
      console.error(error);
    }
  };

  // Functions for logging in
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);

      if (username === "admin@vcc.com") {
        dispatch(setAdmin());
        console.log("admin is true!");
      }
    } catch (error) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        setFailedMessage("Incorrect Password, please try again.");
      } else if (error.code === "auth/user-not-found") {
        setFailedMessage("Incorrect Username, please try again.");
      } else {
        setFailedMessage("An error occured please try again.");
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen mx-auto'>
      <div className='flex flex-col justify-center items-center gap-2 mb-10'>
        <img className='h-10 ml-5' src={logo} alt='' />
        <p className='text-xs text-stone-400'>
          Restoring Harmony, One Fret at a Time!
        </p>
      </div>
      <div className='flex flex-col max-w-md h-96 w-72 border border-stone-300 shadow-lg shadow-stone-400  p-10 rounded-lg'>
        <form className='flex flex-col gap-4'>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className='h-9 py-3 px-2 border-2 rounded-md focus:outline-none'
            type='text'
            placeholder='Email or Username'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='h-9 p-3 border-2 rounded-md focus:outline-none'
            type='password'
            placeholder='Password'
          />
          <p className='text-red-500 font-light text-xs'>{failedMessage}</p>
          <div className='w-full flex flex-col mt-7'>
            <a
              onClick={handleLogin}
              type='button'
              className='relative inline-flex items-center justify-center p-4 px-5 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-md shadow-md group mb-3 cursor-pointer'
            >
              <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  ></path>
                </svg>
              </span>
              <span className='absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease'>
                Login
              </span>
              <span className='relative invisible'>Button Text</span>
            </a>

            <a
              onClick={handleGoogleLogin}
              type='button'
              className='relative inline-flex items-center justify-center p-4 px-5 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-md shadow-md group cursor-pointer'
            >
              <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  ></path>
                </svg>
              </span>
              <span className='absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease'>
                <img className='h-6 mr-2' src={glogo} alt='' />
                Login with Google
              </span>
              <span className='relative invisible'>Button Text</span>
            </a>

            <p className='flex flex-row justify-center items-center gap-1 text-xs text-stone-400 mt-5'>
              Create an account
              <span>
                <a
                  onClick={() => navigate("/signup")}
                  className='text-purple-500'
                  href=''
                >
                  Sign Up
                </a>
              </span>
            </p>
            <p className='flex flex-row justify-center items-center gap-1 text-xs text-stone-400 mt-2'>
              Forgot password?
              <span>
                <a
                  onClick={() => navigate("/reset")}
                  className='text-purple-500'
                  href=''
                >
                  Reset
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
