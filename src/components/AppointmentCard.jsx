import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteAppointment } from '../reducers/appointmentSlice';
import { useNavigate } from 'react-router-dom';

export default function AppointmentCard({ appointments }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = localStorage.getItem('userId');
	const isAdmin = useSelector((state) => state.appointments.isAdmin);

	// Delete button
	const handleDelete = (appointmentId) => {
		dispatch(deleteAppointment(appointmentId));
	};

	// Edit button
	const handleEdit = (appointmentId) => {
		console.log(appointmentId);
		navigate(`/edit/${appointmentId}`);
	};

	//open appointment
	const handleOpen = (appointmentId) => {
		navigate(`/openappointment/${appointmentId}`);
	};

	// Rendering appointments conditionally
	const filteredAppointments = isAdmin
		? appointments // Use the passed appointments prop for admin
		: appointments.filter((appointment) => appointment.userid === userId);

	return (
		<div className='flex flex-wrap gap-4'>
			{filteredAppointments.map((appointment) => (
				<div
					key={appointment.id}
					className='w-80 max-w-96 p-6  border border-gray-200 rounded-lg sbg-stone-200 shadow-md shadow-slate-300'
				>
					<div className='flex items-center justify-between'>
						<h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-800'>
							{appointment.title}
						</h2>
						{isAdmin ? (
							<a
								className='text-xs text-gray-400 cursor-pointer'
								onClick={() => handleDelete(appointment.id)}
							>
								Complete
							</a>
						) : (
							<a
								className='text-xs text-gray-400 cursor-pointer'
								onClick={() => handleDelete(appointment.id)}
							>
								Delete
							</a>
						)}
					</div>
					<div className='mb-5'>
						<p className='font-semibold'>
							{appointment.fromtime} | {appointment.fromdate}
						</p>
						<p className='font-normal text-gray-500'>{appointment.content}</p>
						{isAdmin ? (
							<a
								href={`mailto: ${appointment.email}`}
								className='text-xs text-gray-500'
							>
								{appointment.email} | {appointment.phone}
							</a>
						) : (
							<a className='text-xs text-gray-500'>
								{appointment.email.replace(/"/g, '')} | {appointment.phone}
							</a>
						)}
					</div>
					<div className='flex flex-row gap-2'>
						{isAdmin ? (
							<p></p>
						) : (
							<div className='flex gap-2'>
								<button
									onClick={() => handleEdit(appointment.id)}
									className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none w-full'
								>
									Edit
								</button>
							</div>
						)}

						{isAdmin ? (
							<p></p>
						) : (
							<div className='flex gap-2'>
								<button
									onClick={() => handleOpen(appointment.id)}
									className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none w-full cursor-pointer'
								>
									Share
								</button>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
