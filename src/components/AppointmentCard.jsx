import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteAppointment } from '../reducers/appointmentSlice';
import { useNavigate } from 'react-router-dom';

export default function AppointmentCard({ appointments }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isCopied, setIsCopied] = useState(false);

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

	//share link
	const handleShare = (appointmentId) => {
		const appointmentUrl = `${window.location.origin}/openappointment/${appointmentId}`;
		navigator.clipboard
			.writeText(appointmentUrl)
			.then(() => {
				setIsCopied(true);
				setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
			})
			.catch((error) => {
				console.error('Failed to copy appointment link: ', error);
				setIsCopied(false);
			});
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
								<a
									onClick={() => handleEdit(appointment.id)}
									href='#_'
									className='relative inline-block px-4 py-2 font-medium group text-center'
								>
									<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
									<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
									<span className='relative text-black group-hover:text-white '>
										Edit
									</span>
								</a>
							</div>
						)}

						{isAdmin ? (
							<p></p>
						) : (
							<div className='flex gap-2'>
								<a
									onClick={() => handleShare(appointment.id)}
									href='#_'
									className='relative inline-block px-4 py-2 font-medium group text-center'
								>
									<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
									<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
									<span className='relative text-black group-hover:text-white '>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='w-6 h-6'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
											/>
										</svg>
									</span>
								</a>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
