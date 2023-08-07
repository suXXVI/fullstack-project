import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentById } from '../reducers/appointmentSlice';
// import { saveAppointment } from '../reducers/addtodb';
import { saveAppointment } from '../reducers/appointmentSlice';
import timesync from '../assets/timesync.png';
import logo from '../assets/logo-only.png';
import LoadingAnim from './LoadingAnim';

export default function OpenAppointment() {
	const [summaryG, setSummaryG] = useState('');
	const [locationG, setLocationG] = useState('');
	const [descriptionG, setDescriptionG] = useState('');
	const [fromDateG, setFromDateG] = useState('');
	const [fromTimeG, setFromTimeG] = useState('');
	const [toDateG, setToDateG] = useState('');
	const [toTimeG, setToTimeG] = useState('');
	const [attendee2, setAttendee2] = useState('');
	const [attendeesG, setAttendeesG] = useState('');

	const { id } = useParams();
	const dispatch = useDispatch();
	const appointment = useSelector((state) =>
		state.appointments.appointments.find((app) => app.id === parseInt(id))
	);
	const isLoading = useSelector((state) => state.appointments.isLoading);

	useEffect(() => {
		dispatch(fetchAppointmentById(id));
	}, [dispatch, id]);

	if (!appointment) {
		return (
			<div className='flex h-screen'>
				<LoadingAnim className='m-auto' />
			</div>
		);
	}

	const { title, content, fromdate, todate, email, name } = appointment;
	const fromDateFormatted = new Date(fromdate).toISOString().slice(0, 10);
	const toDateFormatted = new Date(todate).toISOString().slice(0, 10);
	const emailWithoutQuotes = email.replace(/"/g, '');

	const handleAddToDb = () => {
		setAttendeesG(`${emailWithoutQuotes},${attendee2}`);
		console.log(attendeesG);
		const startDateTime = new Date(`${fromDateG}T${fromTimeG}`).toISOString();
		const endDateTime = new Date(`${toDateG}T${toTimeG}`).toISOString();

		const appointmentData = {
			summary: summaryG,
			location: locationG,
			description: descriptionG,
			startDateTime: startDateTime,
			endDateTime: endDateTime,
			attendees: attendeesG,
		};
		console.log(appointmentData);
		dispatch(saveAppointment(appointmentData));
	};

	return (
		<>
			<nav className='border-gray-200 border-b'>
				<div className='max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4'>
					<a href='#' className='flex items-center'>
						<img
							src={timesync}
							className='h-6 hidden sm:block sm:h-8 ml-3'
							alt='Flowbite Logo'
						/>
						<img
							src={logo}
							className='h-12 sm:hidden ml-3'
							alt='Flowbite Logo'
						/>
						<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'></span>
					</a>
				</div>
			</nav>
			<div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
				<h1 className='w-full text-3xl font-bold'>
					Set your Appointment with {name}
				</h1>
				<div className='flex flex-col md:flex-row md:gap-10 w-full justify-between mt-10'>
					<div className='flex flex-col gap-3 mb-16'>
						<p className='text-2xl font-semibold'>{emailWithoutQuotes}</p>
						<p className='font-semibold'>{title}</p>
						<p className='font-semibold'>{content}</p>
						<p className='font-semibold text-xl'>Days available</p>
						<p className='font-semibold'>
							{fromDateFormatted} to {toDateFormatted}
						</p>
					</div>

					<div className='flex-1 max-w-md'>
						<form className='form flex flex-col gap-5' id='event_form'>
							<label>Summary</label>
							<input
								onChange={(e) => setSummaryG(e.target.value)}
								value={summaryG}
								type='text'
								name='summary'
								placeholder='Summary'
								id='summary-input'
								className='focus:outline-none'
							/>
							<label>Location</label>
							<input
								onChange={(e) => setLocationG(e.target.value)}
								value={locationG}
								type='text'
								name='location'
								placeholder='Location'
								id='location-input'
								className='focus:outline-none'
							/>
							<label>Description</label>
							<input
								onChange={(e) => setDescriptionG(e.target.value)}
								value={descriptionG}
								type='text'
								name='description'
								placeholder='Description'
								id='description-input'
								className='focus:outline-none'
							/>
							<label>Start Date</label>
							<input
								onChange={(e) => setFromDateG(e.target.value)}
								value={fromDateG}
								type='date'
								name='start_date'
								id='startdate-input'
								className='focus:outline-none'
								min={fromDateFormatted}
								max={toDateFormatted}
							/>
							<label>Start Time</label>
							<input
								onChange={(e) => setFromTimeG(e.target.value)}
								value={fromTimeG}
								type='time'
								name='start_time'
								id='starttime-input'
								className='focus:outline-none'
							/>
							<label>End Date</label>
							<input
								onChange={(e) => setToDateG(e.target.value)}
								value={toDateG}
								type='date'
								name='end_date'
								id='enddate-input'
								className='focus:outline-none'
								min={fromDateFormatted}
								max={toDateFormatted}
							/>
							<label>End Time</label>
							<input
								onChange={(e) => setToTimeG(e.target.value)}
								value={toTimeG}
								type='time'
								name='end_time'
								id='endtime-input'
								className='focus:outline-none'
							/>
							<label>Your Email</label>
							<input
								onChange={(e) => setAttendee2(e.target.value)}
								value={attendee2}
								type='text'
								name='attendees'
								className='focus:outline-none'
								placeholder='example@mail.com'
								id='attendees-input'
							/>
							<button
								onClick={handleAddToDb}
								className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-stone-800 focus:shadow-outline focus:outline-none w-full'
								type='button'
								id='add_event_button'
							>
								{isLoading ? 'Saving...' : 'Set Appointment'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
