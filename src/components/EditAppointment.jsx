import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAppointment } from '../reducers/appointmentSlice';

export default function EditEvent() {
	const { id } = useParams();
	const appointments = useSelector((state) => state.appointments.appointments);
	const isLoading = useSelector((state) => state.appointments.isLoading);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [fromDate, setFromDate] = useState('');
	const [fromTime, setFromTime] = useState('');
	const [toDate, setToDate] = useState('');
	const [toTime, setToTime] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [failedMessage, setFailedMessage] = useState('');

	// checking to see if eventId is passed
	useEffect(() => {
		const appointment = appointments.find(
			(appointment) => appointment.id === parseInt(id)
		);
		if (appointment) {
			setTitle(appointment.title);
			setContent(appointment.content);
			setFromDate(appointment.fromdate);
			setToDate(formatDate(appointment.todate));
			setFromTime(appointment.fromtime);
			setToTime(appointment.totime);
			setEmail(appointment.email);
			setPhone(appointment.phone);
		}
	}, [id, appointments]);

	function formatDate(isoDate) {
		const dateObject = new Date(isoDate);
		const year = dateObject.getFullYear();
		const month = String(dateObject.getMonth() + 1).padStart(2, '0');
		const day = String(dateObject.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const userId = localStorage.getItem('userId');

	const handleSaveAppointment = async () => {
		const eventData = {
			title: title,
			content: content,
			fromdate: fromDate,
			fromtime: fromTime,
			totime: toTime,
			todate: toDate,
			email: email,
			phone: phone,
			userid: userId,
		};

		try {
			await dispatch(
				editAppointment({ appointmentId: id, appointmentData: eventData })
			);
			navigate('/dashboard');
		} catch (error) {
			console.log('Error:', error);
			setFailedMessage('An error while trying to save changes.');
		}
	};

	const handleSetTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleSetType = (e) => {
		setContent(e.target.value);
	};

	const handleSetFromDate = (e) => {
		setFromDate(e.target.value);
	};

	const handleSetToDate = (e) => {
		setToDate(e.target.value);
		console.log(toDate);
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
				<div className='flex flex-col justify-center items-center mx-auto w-96 border-2 p-2 mt-10 bg-black text-white rounded-lg px-5'>
					<form className='flex flex-col gap-4 w-full'>
						<p className='text-stone-600'>Appointment:</p>
						<input
							onChange={handleSetTitle}
							value={title}
							className='h-10 px-2 border-2'
							type='text'
							placeholder='Summary'
							required
						/>

						<p className='text-stone-600'>Description:</p>
						<input
							onChange={handleSetType}
							value={content}
							className='h-10 px-2 border-2 focus:outline-none'
							type='text'
							required
							placeholder='Description'
						/>

						{/* days available */}
						<p className='text-stone-600'>Days available:</p>
						<p className='text-stone-600'>From</p>
						<input
							onChange={handleSetFromDate}
							value={fromDate}
							className='h-9 py-3 px-2 border-2 focus:outline-none'
							type='date'
							placeholder='From'
							required
						/>
						<p className='text-stone-600'>to</p>
						<input
							onChange={handleSetToDate}
							value={toDate}
							className='h-9 py-3 px-2 border-2 focus:outline-none'
							type='date'
							required
						/>

						{/* time available */}
						<p className='text-stone-600'>Time:</p>
						<p className='text-stone-600'>From</p>
						<input
							onChange={handleSetFromTime}
							value={fromTime}
							className='h-9 py-3 px-2 border-2 focus:outline-none'
							type='time'
							required
						/>

						<p className='text-stone-600'>To</p>
						<input
							onChange={handleSetToTime}
							value={toTime}
							className='h-9 py-3 px-2 border-2 focus:outline-none'
							type='time'
							required
						/>

						<p className='text-stone-600'>Email:</p>
						<input
							onChange={handleSetEmail}
							value={email}
							className='h-9 py-3 px-2 border-2 focus:outline-none'
							type='text'
							placeholder='example@mail.com'
							required
						/>
						<p className='text-stone-600'>Phone:</p>
						<input
							onChange={handleSetPhone}
							value={phone}
							className='h-9 py-3 px-2 border-2 focus:outline-none'
							type='text'
							placeholder='+1 365 2435676'
							required
						/>
						<p className='text-red-500 font-light text-xs'>{failedMessage}</p>
						<button
							onClick={handleSaveAppointment}
							type='button'
							className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-stone-800 focus:shadow-outline focus:outline-none'
						>
							{isLoading ? 'Saving...' : 'Save changes'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
