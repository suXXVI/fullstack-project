import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { AuthContext } from './AuthProvider';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import glogo from '../assets/google-logo.png';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../reducers/appointmentSlice';
import AppLogo from './AppLogo';

export default function LoginPage() {
  const [failedMessage, setFailedMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (currentUser) navigate('/dashboard');

    if (!currentUser && userId == null) {
      navigate('*');
    }
  }, [currentUser, userId, navigate]);

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

      if (username === 'admin@vcc.com') {
        dispatch(setAdmin());
        console.log('admin is true!');
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        setFailedMessage('Incorrect Password, please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setFailedMessage('Incorrect Username, please try again.');
      } else {
        setFailedMessage('An error occured please try again.');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen mx-auto'>
      <AppLogo />
      <div className='flex flex-col max-w-md h-100 w-72 border border-black shadow-md p-10'>
        <form className='flex flex-col gap-4'>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className='h-9 py-3 px-2 border-2  focus:outline-none'
            type='text'
            placeholder='Email or Username'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='h-9 p-3 border-2 focus:outline-none'
            type='password'
            placeholder='Password'
          />
          <p className='text-red-500 font-light text-xs'>{failedMessage}</p>
          <div className='w-full flex flex-col gap-5 mt-7'>
            <a
              onClick={handleLogin}
              href='#_'
              className='relative inline-block px-4 py-2 font-medium group text-center'
            >
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
              <span className='relative text-black group-hover:text-white '>
                Login
              </span>
            </a>

            <a
              onClick={handleGoogleLogin}
              href='#_'
              className='relative inline-block px-4 py-2 font-medium group text-center'
            >
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
              <span className='relative text-black group-hover:text-white flex justify-center items-center'>
                <img className='h-6 mr-2' src={glogo} alt='' />
                Login with Google
              </span>
            </a>

            <div>
              <p className='flex flex-row justify-center items-center gap-1 text-xs text-stone-400 mt-5'>
                Create an account
                <span>
                  <a
                    onClick={() => navigate('/signup')}
                    className='text-black'
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
                    onClick={() => navigate('/reset')}
                    className='text-black'
                    href=''
                  >
                    Reset
                  </a>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
