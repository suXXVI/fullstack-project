import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentById } from '../reducers/appointmentSlice';
import { saveAppointment } from '../reducers/addtodb';
import timesync from '../assets/timesync.png';

export default function OpenAppointment() {
	const [summaryG, setSummaryG] = useState('');
	const [locationG, setLocationG] = useState('');
	const [descriptionG, setDescriptionG] = useState('');
	const [fromDateG, setFromDateG] = useState('');
	const [fromTimeG, setFromTimeG] = useState('');
	const [toDateG, setToDateG] = useState('');
	const [toTimeG, setToTimeG] = useState('');
	const [attendeesG, SetAttendeesG] = useState('');

	const { id } = useParams();
	const dispatch = useDispatch();
	const appointment = useSelector((state) =>
		state.appointments.appointments.find((app) => app.id === parseInt(id))
	);

	useEffect(() => {
		// Fetch the appointment when the component mounts
		dispatch(fetchAppointmentById(id));
	}, [dispatch, id]);

	if (!appointment) {
		// If the appointment is still being fetched or not found, show a loading message or an error message.
		return <p>Loading...</p>;
	}

	const { title, content, fromdate, todate, email } = appointment;
	const fromDateFormatted = new Date(fromdate).toISOString().slice(0, 10);
	const toDateFormatted = new Date(todate).toISOString().slice(0, 10);
	const emailWithoutQuotes = email.replace(/"/g, '');

	const handleAddToDb = () => {
		console.log('fromDateG:', fromDateG);
		console.log('fromTimeG:', fromTimeG);
		console.log('toDateG:', toDateG);
		console.log('toTimeG:', toTimeG);
		const startDateTime = new Date(`${fromDateG}T${fromTimeG}`).toISOString();
		const endDateTime = new Date(`${toDateG}T${toTimeG}`).toISOString();

		const appointmentData = {
			summary: summaryG,
			location: locationG,
			description: descriptionG, // Fix the typo here
			startDateTime: startDateTime,
			endDateTime: endDateTime,
			attendees: attendeesG,
		};
		dispatch(saveAppointment(appointmentData));
	};

	return (
		<>
			<div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
				<img src={timesync} className='h-5' />
				<h1 className='w-full text-3xl font-bold'>Set your Appointment</h1>
				<div className='flex flex-col md:flex-row md:gap-10 w-full justify-between mt-10'>
					<div className='flex flex-col gap-3'>
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
							/>
							<label>Location</label>
							<input
								onChange={(e) => setLocationG(e.target.value)}
								value={locationG}
								type='text'
								name='location'
								placeholder='Location'
								id='location-input'
							/>
							<label>Description</label>
							<input
								onChange={(e) => setDescriptionG(e.target.value)}
								value={descriptionG}
								type='text'
								name='description'
								placeholder='Description'
								id='description-input'
							/>
							<label>Start Date</label>
							<input
								onChange={(e) => setFromDateG(e.target.value)}
								value={fromDateG}
								type='date'
								name='start_date'
								id='startdate-input'
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
							/>
							<label>End Date</label>
							<input
								onChange={(e) => setToDateG(e.target.value)}
								value={toDateG}
								type='date'
								name='end_date'
								id='enddate-input'
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
							/>
							<label>Attendees (comma-separated email addresses)</label>
							<input
								onChange={(e) => SetAttendeesG(e.target.value)}
								value={attendeesG}
								type='text'
								name='attendees'
								placeholder='Enter attendee emails'
								id='attendees-input'
							/>
							<button
								onClick={handleAddToDb}
								className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-stone-800 focus:shadow-outline focus:outline-none w-full'
								type='button'
								id='add_event_button'
							>
								Set Appointment
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
