import Navbar from './Navbar';
import LoadingAnim from './LoadingAnim';
import AppointmentCard from './AppointmentCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	fetchAllAppointments,
	fetchAppointmentsByUser,
} from '../reducers/appointmentSlice';

export default function Dashboard() {
	const navigate = useNavigate();
	const isLoading = useSelector((state) => state.appointments.isLoading);
	const dispatch = useDispatch();

	const appointments = useSelector((state) => state.appointments.appointments);
	const userId = localStorage.getItem('userId');
	const isAdmin = useSelector((state) => state.appointments.isAdmin);
	const allAppointments = useSelector(
		(state) => state.appointments.appointments
	);

	useEffect(() => {
		// Fetch appointments when the Dashboard component mounts
		if (isAdmin) {
			dispatch(fetchAllAppointments());
		} else {
			dispatch(fetchAppointmentsByUser(userId));
		}
	}, [userId, isAdmin, dispatch]);

	return (
		<div>
			<Navbar />
			<div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
				<div className='flex justify-between items-center w-full'>
					{isLoading ? (
						<LoadingAnim />
					) : (
						<p className='sm:text-3xl text-2xl text-gray-800 font-bold '>
							Appointments
						</p>
					)}
					<button
						onClick={() => navigate('/add')}
						className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-stone-800 focus:shadow-outline focus:outline-none'
					>
						<span className='hidden sm:inline'>+ Create Link</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6 sm:hidden' // Show the SVG icon only on small screens
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 4.5v15m7.5-7.5h-15'
							/>
						</svg>
					</button>
				</div>

				{/* events container */}
				<div className='flex justify-start w-full mt-5'>
					<AppointmentCard
						appointments={isAdmin ? allAppointments : appointments}
					/>
				</div>
			</div>
		</div>
	);
}
