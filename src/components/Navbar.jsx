import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import timesync from '../assets/timesync.png';
import logo from '../assets/logo-only.png';
import useLocalStorage from 'use-local-storage';
import { resetAppointments } from '../reducers/appointmentSlice';
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [userId, setUserId] = useLocalStorage('userId', null);
  const email = localStorage.getItem('email');
  const cleanedEmail = email.replace(/['"]+/g, '');

  const handleLogout = () => {
    auth.signOut();
    setUserId(null);
    localStorage.removeItem('profilepic');
    dispatch(resetAppointments());
  };
  if (!currentUser && userId == null) {
    navigate('*');
  }

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className='border-gray-200 border-b'>
      <div className='max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center'>
          <img
            src={timesync}
            className='h-6 hidden sm:block sm:h-8 ml-3'
            alt='Flowbite Logo'
          />
          <img src={logo} className='h-12 sm:hidden ml-3' alt='Flowbite Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'></span>
        </a>
        <div className='flex flex-row justify-center items-center gap-5'>
          <a
            onClick={handleGoToProfile}
            className='font-semibold text-gray-800 hidden sm:flex cursor-pointer'
          >
            {cleanedEmail}
          </a>
          <a onClick={handleGoToProfile} className='sm:hidden cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-10 h-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </a>
          <a
            onClick={handleLogout}
            href='#_'
            className='relative inline-block px-4 py-2 font-medium group text-center'
          >
            <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
            <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
            <span className='relative text-black group-hover:text-white '>
              Log Out
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
