import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from '../reducers/appointmentSlice';
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

	const userId = localStorage.getItem('userId');
	const allAppointments = useSelector(
		(state) => state.appointments.appointments
	);

	//getting all appointments from backend to check for data and time
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

		// checking if date and time is already booked
		const isDateAvailable = allAppointments.some(
			(appointment) =>
				appointment.fromdate === fromDate && appointment.fromtime === fromTime
		);

		// form validation
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
			dispatch(addNewAppointment(appointmentData));
			dispatch(sendEmail(appointmentData));
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

	// Set days available
	const handleSetFromDate = (e) => {
		setFromDate(e.target.value);
	};

	const handleSetToDate = (e) => {
		setToDate(e.target.value);
	};

	//Set time available
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
					<button
						onClick={() => navigate('/dashboard')}
						type='button'
						className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-stone-800 focus:shadow-outline focus:outline-none'
					>
						Go back
					</button>
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
							placeholder='Details'
						/>

						{/* days available */}
						{/* <p className='text-stone-600'>Days you are available:</p> */}
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
						{/* <p className='text-stone-600'>Time you are available:</p> */}
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
							<button
								onClick={handleAddAppointment}
								type='button'
								className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-stone-800 focus:shadow-outline focus:outline-none w-24'
							>
								Add
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
