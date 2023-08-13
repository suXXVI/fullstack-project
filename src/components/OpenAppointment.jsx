import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentById } from '../reducers/appointmentSlice';
import { saveAppointment } from '../reducers/appointmentSlice';
import timesync from '../assets/timesync.png';
import logo from '../assets/logo-only.png';
import LoadingAnim from './LoadingAnim';
import { sendEmail } from '../reducers/appointmentSlice';

export default function OpenAppointment() {
  //   const [summaryG, setSummaryG] = useState('');
  const [locationG, setLocationG] = useState('');
  const [fromDateG, setFromDateG] = useState('');
  const [fromTimeG, setFromTimeG] = useState('');
  const [toDateG, setToDateG] = useState('');
  const [toTimeG, setToTimeG] = useState('');
  const [attendee2, setAttendee2] = useState('');
  const [emailWithoutQuotes, setEmailWithoutQuotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const appointment = useSelector((state) =>
    state.appointments.appointments.find((app) => app.id === parseInt(id))
  );

  useEffect(() => {
    dispatch(fetchAppointmentById(id));
    if (appointment) {
      const email = appointment.email;
      setEmailWithoutQuotes(email.replace(/"/g, ''));
    }
  }, [dispatch, id, appointment, emailWithoutQuotes]);

  if (!appointment) {
    return (
      <div className='flex h-screen'>
        <LoadingAnim className='m-auto' />
      </div>
    );
  }

  const { title, content, fromdate, todate, name, location } = appointment;
  const fromDateFormatted = new Date(fromdate).toISOString().slice(0, 10);
  const toDateFormatted = new Date(todate).toISOString().slice(0, 10);

  const handleAddToDb = async () => {
    const startDateTime = new Date(`${fromDateG}T${fromTimeG}`).toISOString();
    const endDateTime = new Date(`${toDateG}T${toTimeG}`).toISOString();

    // send to nodemailer api
    const forNodeMailer = {
      title: title,
      name: name,
      date: fromDateG,
      fromTimeG: fromTimeG,
      toTimeG: toTimeG,
      email1: emailWithoutQuotes,
      email2: attendee2,
    };

    // for google calendar
    const appointmentData = {
      summary: title,
      location: location,
      description: content,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      attendees: `${emailWithoutQuotes},${attendee2}`,
    };
    console.log(appointmentData);

    try {
      setIsLoading(true);
      await dispatch(saveAppointment(appointmentData));
      await dispatch(sendEmail(forNodeMailer));
      navigate('/endpage');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleAddAttendee = (e) => {
    setAttendee2(e.target.value);
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
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 mb-10 px-20'>
        <h1 className='w-full text-3xl font-bold'>
          Set your Appointment with {name}
        </h1>
        <div className='flex flex-col md:flex-row md:gap-10 w-full justify-between mt-10'>
          <div className='flex flex-col gap-3 mb-16'>
            <p className='text-2xl font-semibold'>{emailWithoutQuotes}</p>
            <p className='font-semibold'>{title}</p>
            <p className='font-semibold'>{content}</p>
            <p className='font-semibold'>{location}</p>
            <p className='font-semibold text-xl'>Days available</p>
            <p className='font-semibold'>
              {fromDateFormatted} to {toDateFormatted}
            </p>
          </div>

          <div className='flex-1 max-w-md'>
            <form className='form flex flex-col gap-5' id='event_form'>
              <label>Summary</label>
              {/* <input
                value={title}
                type='text'
                name='summary'
                placeholder='Summary'
                id='summary-input'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
              /> */}
              {/* <label>Location</label>
              <input
                onChange={(e) => setLocationG(e.target.value)}
                value={locationG}
                type='text'
                name='location'
                placeholder='Location'
                id='location-input'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
              /> */}
              {/* <label>Description</label>
              <input
                value={content}
                type='text'
                name='description'
                placeholder='Description'
                id='description-input'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
              /> */}
              <label>Start Date</label>
              <input
                onChange={(e) => setFromDateG(e.target.value)}
                value={fromDateG}
                type='date'
                name='start_date'
                id='startdate-input'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
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
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
              />
              <label>End Date</label>
              <input
                onChange={(e) => setToDateG(e.target.value)}
                value={toDateG}
                type='date'
                name='end_date'
                id='enddate-input'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
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
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
              />
              <label>Your Email</label>
              <input
                onChange={handleAddAttendee}
                value={attendee2}
                type='text'
                name='attendees'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                placeholder='example@mail.com'
                id='attendees-input'
                autoComplete='off'
              />
            </form>
            <a
              onClick={handleAddToDb}
              href='#_'
              className='relative inline-block px-4 py-2 font-medium group text-center'
            >
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
              <span className='relative text-black group-hover:text-white '>
                {isLoading ? 'Saving...' : 'Set Appointment'}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
