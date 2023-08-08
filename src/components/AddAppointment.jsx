import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewAppointment,
	fetchAllAppointments,
} from '../reducers/appointmentSlice';

export default function AddEvent() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [name, setName] = useState('');
	const [fromDate, setFromDate] = useState('');
	const [fromTime, setFromTime] = useState('');
	const [toDate, setToDate] = useState('');
	const [toTime, setToTime] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [failedMessage, setFailedMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const userId = localStorage.getItem('userId');
	const allAppointments = useSelector(
		(state) => state.appointments.appointments
	);

	useEffect(() => {
		dispatch(fetchAllAppointments());
	}, [dispatch]);

	const handleAddAppointment = async () => {
		const appointmentData = {
			title: title,
			name: name,
			content: content,
			fromdate: fromDate,
			fromtime: fromTime,
			totime: toTime,
			todate: toDate,
			email: email,
			phone: phone,
			userid: userId,
		};

		const isDateAvailable = allAppointments.some(
			(appointment) =>
				appointment.fromdate === fromDate && appointment.fromtime === fromTime
		);

		if (!title || !fromDate || !fromTime || !email || !phone) {
			setFailedMessage('Incomplete appointment details');
			return;
		}

		if (isDateAvailable) {
			setFailedMessage(
				'Time slot not available, please pick a different time.'
			);
			console.log('The time and date are not available.');
			return;
		}

		try {
			setIsLoading(true);
			await dispatch(addNewAppointment(appointmentData));
			navigate('/dashboard');
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const handleSetTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleSetName = (e) => {
		setName(e.target.value);
	};

	const handleSetType = (e) => {
		setContent(e.target.value);
	};

	const handleSetFromDate = (e) => {
		setFromDate(e.target.value);
	};

	const handleSetToDate = (e) => {
		setToDate(e.target.value);
	};

	const handleSetFromTime = (e) => {
		setFromTime(e.target.value);
	};

	const handleSetToTime = (e) => {
		setToTime(e.target.value);
	};

	const handleSetEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSetPhone = (e) => {
		setPhone(e.target.value);
	};

	return (
		<div>
			<Navbar />
			<div className='flex flex-col p-10 sm:max-w-6xl sm:mx-auto'>
				<div className='flex justify-end w-full'>
					<a
						onClick={() => navigate('/dashboard')}
						href='#_'
						className='relative inline-block px-4 py-2 font-medium group text-center'
					>
						<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
						<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
						<span className='relative text-black group-hover:text-white '>
							Go Back
						</span>
					</a>
				</div>
				<div>
					<form className='flex flex-col gap-3'>
						<p className='text-stone-600'>Title</p>
						<input
							onChange={handleSetTitle}
							value={title}
							className='h-10 px-2 border-2 w-full focus:outline-none'
							type='text'
							placeholder='e.g., 1hr meeting'
							required
						/>

						<p className='text-stone-600'>Name</p>
						<input
							onChange={handleSetName}
							value={name}
							className='h-10 px-2 border-2 w-full focus:outline-none'
							type='text'
							placeholder='e.g., John Doe'
							required
						/>

						<p className='text-stone-600'>Details</p>
						<input
							onChange={handleSetType}
							value={content}
							className='h-10 w-full px-2 border-2 focus:outline-none'
							type='text'
							required
							placeholder='e.g., Team Meeting'
						/>

						{/* days available */}
						<p className='text-stone-600'>From</p>
						<input
							onChange={handleSetFromDate}
							value={fromDate}
							className='h-9 py-3 px-2 border-2 focus:outline-none w-full'
							type='date'
							required
						/>
						<p className='text-stone-600'>to</p>
						<input
							onChange={handleSetToDate}
							value={toDate}
							className='h-9 py-3 px-2 border-2 focus:outline-none w-full'
							type='date'
							required
						/>

						{/* time available */}
						<p className='text-stone-600'>From</p>
						<input
							onChange={handleSetFromTime}
							value={fromTime}
							className='h-9 py-3 px-2 border-2 focus:outline-none w-full'
							type='time'
							required
						/>

						<p className='text-stone-600'>To</p>
						<input
							onChange={handleSetToTime}
							value={toTime}
							className='h-9 py-3 px-2 border-2 focus:outline-none w-full'
							type='time'
							required
						/>

						<p className='text-stone-600'>Email:</p>
						<input
							onChange={handleSetEmail}
							value={email}
							className='h-9 py-3 px-2 border-2 focus:outline-none w-full'
							type='text'
							placeholder='example@mail.com'
							required
						/>
						<p className='text-stone-600'>Phone:</p>
						<input
							onChange={handleSetPhone}
							value={phone}
							className='h-9 py-3 px-2 border-2 focus:outline-none w-full'
							type='number'
							placeholder='+1 365 2435676'
							required
						/>
						<p className='text-red-500 font-light text-xs'>{failedMessage}</p>
						<div className='mt-10 flex flex-row justify-end'>
							<a
								onClick={handleAddAppointment}
								href='#_'
								className='relative inline-block px-4 py-2 font-medium group text-center'
							>
								<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
								<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
								<span className='relative text-black group-hover:text-white '>
									{isLoading ? 'Creating...' : 'Create'}
								</span>
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
