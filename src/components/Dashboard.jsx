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
			<div className='flex flex-col p-10 sm:max-w-6xl sm:mx-auto'>
				<div className='flex justify-between items-center w-full'>
					{isLoading ? (
						<LoadingAnim />
					) : (
						<p className='sm:text-3xl text-2xl text-gray-800 font-bold '>
							Appointments
						</p>
					)}
					<a
						onClick={() => navigate('/add')}
						href='#_'
						className='relative inline-block px-4 py-2 font-medium group text-center'
					>
						<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
						<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
						<span className='relative text-black group-hover:text-white '>
							+ Create Link
						</span>
					</a>
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
