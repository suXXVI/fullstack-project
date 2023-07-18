import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-background.png";

export default function SignupPage() {
  const [failedMessage, setFailedMessage] = useState("");
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
      if (password.length < 4) {
        setFailedMessage("Password too short.");
      } else if (error.code === "auth/email-already-in-use") {
        setFailedMessage("Email already in use.");
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
      <div className='flex flex-col max-w-md h-96 w-72 border border-stone-300 shadow-lg shadow-stone-400  p-10 rounded-lg'>
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
              onClick={handleSignUp}
              type='button'
              className='whitespace-nowrap rounded relative inline-flex group items-center justify-center px-4 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white text-sm'
            >
              Sign Up
            </button>
            <p className='flex flex-row mb-3 gap-1 text-xs text-stone-400'>
              Already have an account?
              <span>
                <a
                  onClick={() => navigate("/login")}
                  className='text-blue-500'
                  href=''
                >
                  Login
                </a>
              </span>
            </p>
            <p className='text-xs text-stone-400'>
              By singing up, you agree to the{" "}
              <span className='text-blue-500'>terms of Serivce</span> and{" "}
              <span className='text-blue-500'>Privacy Policy</span>, including
              Cookie Use. <span className='text-blue-500'>Learn more.</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
