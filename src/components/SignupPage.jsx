import {
  createUserWithEmailAndPassword,
  getAuth,
  //   signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
// import glogo from "../assets/google-logo.png";

export default function SignupPage() {
  //   const [failedMessage, setFailedMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("*");
  }, [currentUser, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(res.user);
    } catch (error) {
      console.error(error);
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
          <p className='text-red-500 font-light text-xs'>{}</p>
          <div className='w-full flex flex-col mt-10'>
            <button
              onClick={handleSignUp}
              type='button'
              className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 font-semibold'
            >
              Sign Up
            </button>
            <p className='text-xs text-stone-400'>
              By singing up, you agree to the{" "}
              <span className='text-blue-500'>terms of Serivce</span> and{" "}
              <span className='text-blue-500'>Privacy Policy</span>, including
              Cookie Use. Learn More.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
