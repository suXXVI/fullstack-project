import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import timesync from '../assets/timesync.png';
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
		dispatch(resetAppointments());
	};
	if (!currentUser && userId == null) {
		navigate('*');
	}

	return (
		<nav className='border-gray-200 border-b'>
			<div className='max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4'>
				<a href='#' className='flex items-center'>
					<img src={timesync} className='h-6 sm:h-8 ml-3' alt='Flowbite Logo' />
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'></span>
				</a>
				<div className='flex flex-row justify-center items-center gap-5'>
					<p className='font-semibold text-gray-800 hidden sm:flex'>
						{cleanedEmail}
					</p>
					<button
						onClick={handleLogout}
						className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-stone-800 focus:shadow-outline focus:outline-none w-full'
					>
						Log Out
					</button>
				</div>
			</div>
		</nav>
	);
}
