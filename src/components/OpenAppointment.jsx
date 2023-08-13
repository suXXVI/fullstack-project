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
  const [fromDateG, setFromDateG] = useState('');
  const [fromTimeG, setFromTimeG] = useState('');
  const [toTimeG, setToTimeG] = useState('');
  const [attendee2, setAttendee2] = useState('');
  const [emailWithoutQuotes, setEmailWithoutQuotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [failedMessage, setFailedMessage] = useState('');

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

  const { title, content, fromdate, todate, name, location, fromtime, totime } =
    appointment;
  console.log(`${fromtime} ${totime}`);
  const fromDateFormatted = new Date(fromdate).toISOString().slice(0, 10);
  const toDateFormatted = new Date(todate).toISOString().slice(0, 10);

  const handleAddToDb = async () => {
    if (!fromDateG || !attendee2 || toTimeG) {
      setFailedMessage('Please fill in all details');
    }

    const startDateTime = new Date(`${fromDateG}T${fromTimeG}`).toISOString();
    const endDateTime = new Date(`${fromDateG}T${toTimeG}`).toISOString();

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

  // limit time selection
  const fromTimeParts = fromtime.split(':');
  const toTimeParts = totime.split(':');

  const fromHour = parseInt(fromTimeParts[0]);
  const fromMinute = parseInt(fromTimeParts[1]);
  const toHour = parseInt(toTimeParts[0]);
  const toMinute = parseInt(toTimeParts[1]);

  const fromTimeFormatted = `${fromHour}:${fromMinute}`;
  const toTimeFormatted = `${toHour}:${toMinute}`;

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
        <div className='flex flex-col md:flex-row md:gap-10 w-full justify-between mt-10'>
          <div className='flex flex-col gap-3 mb-16'>
            <div className='border-b border-stone-300 p-5'>
              <p className='font-semibold text-2xl mb-3'>
                {name}'s availability
              </p>
              <p className='font-semibold '>
                Days:{' '}
                <span className='text-stone-500'>{fromDateFormatted}</span>
                <span className='mx-1'>to</span>
                <span className='text-stone-500'>{toDateFormatted}</span>
              </p>
              <p className='font-semibold'>
                Hours: <span className='text-stone-500'>{fromtime}</span>
                <span className='mx-1'>to</span>
                <span className='text-stone-500'>{totime}</span>
              </p>
            </div>
            <div className='border-b border-stone-300 p-5'>
              <p className='text-2xl font-semibold mb-3'>Appointment details</p>
              <p className='font-semibold text-stone-500'>{title}</p>
              <p className='font-semibold text-stone-500'>{content}</p>
              <p className='font-semibold text-stone-500'>{location}</p>
              <p className='font-semibold text-stone-500'>
                {emailWithoutQuotes}
              </p>
            </div>
          </div>

          <div className='flex-1 max-w-md  md:border-l border-stone-300 p-5'>
            <form className='form flex flex-col gap-5' id='event_form'>
              <h1 className='font-semibold text-2xl mb-5'>
                Set your appointment with {name}
              </h1>
              <label className='font-semibold'>Date</label>
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
              <label className='font-semibold'>Start Time</label>
              <input
                onChange={(e) => setFromTimeG(e.target.value)}
                value={fromTimeG}
                type='time'
                name='start_time'
                id='starttime-input'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
                min={fromTimeFormatted}
                max={toTimeFormatted}
              />
              <label className='font-semibold'>End Time</label>
              <input
                onChange={(e) => setToTimeG(e.target.value)}
                value={toTimeG}
                type='time'
                name='end_time'
                id='endtime-input'
                className='h-10 px-2 border-2 w-full focus:outline-none'
                autoComplete='off'
                min={fromDateFormatted}
                max={toTimeFormatted}
              />
              <label className='font-semibold'>Your Email</label>
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
              <p className='text-red-500'>
                {failedMessage ? failedMessage : ''}
              </p>
              <a
                onClick={handleAddToDb}
                href='#_'
                className='relative inline-block px-4 py-2 font-medium group text-center '
              >
                <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                <span className='relative text-black group-hover:text-white '>
                  {isLoading ? 'Saving...' : 'Set Appointment'}
                </span>
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
