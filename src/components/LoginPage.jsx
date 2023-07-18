import {
  //   createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import glogo from "../assets/google-logo.png";

export default function LoginPage() {
  const [failedMessage, setFailedMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/dashboard");
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
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
        <img className='h-10 ' src={logo} alt='' />
        <p className='text-xs text-stone-400'>
          Streamline your schedule, save time, achieve more
        </p>
      </div>
      <div className='flex flex-col max-w-md h-2/5 w-72 border border-stone-300 shadow-lg shadow-stone-400  p-10 rounded-lg'>
        <form className='flex flex-col gap-4'>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className='h-9 py-3 px-2 border-2'
            type='text'
            placeholder='Username'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='h-9 p-3 border-2'
            type='password'
            placeholder='Password'
          />
          <p className='text-red-500 font-light text-xs'>{failedMessage}</p>
          <div className='w-full flex flex-col mt-10'>
            <button
              onClick={handleLogin}
              type='button'
              className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-semibold'
            >
              Login
            </button>
            <button
              type='button'
              className='flex flex-row justify-center items-center gap-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 import logo from "../assets/logo-no-background.png font-semibold'
            >
              <img className='h-6' src={glogo} alt='' />
              Login with Google
            </button>
            <p className='flex flex-row justify-center items-center gap-1 text-xs text-stone-400'>
              Create an account
              <span>
                <a
                  onClick={() => navigate("/signup")}
                  className='text-blue-500'
                  href=''
                >
                  Sign Up
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
