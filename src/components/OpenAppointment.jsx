import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentById } from "../reducers/appointmentSlice";

export default function EditEvent() {
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

  return (
    <>
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
        <h1 className='w-full text-3xl font-bold'>Set your Appointment</h1>
        <div className='flex flex-row w-full justify-between mt-10'>
          <div className='flex flex-col gap-3'>
            <p className='text-2xl font-semibold'>{email}</p>
            <p className='font-semibold'>{title}</p>
            <p className='font-semibold'>{content}</p>
            <p className='font-semibold text-xl'>Days available</p>
            <p className='font-semibold'>
              {fromdate} to {todate}
            </p>
          </div>

          <div className='flex-1 max-w-md'>
            <form className='form flex flex-col gap-5' id='event_form'>
              <label>Summary</label>
              <input
                type='text'
                name='summary'
                placeholder='Summary'
                id='summary-input'
              />
              <label>Location</label>
              <input
                type='text'
                name='location'
                placeholder='Location'
                id='location-input'
              />
              <label>Description</label>
              <input
                type='text'
                name='description'
                placeholder='Description'
                id='description-input'
              />
              <label>Start Date</label>
              <input type='date' name='start_date' id='startdate-input' />
              <label>Start Time</label>
              <input type='time' name='start_time' id='starttime-input' />
              <label>End Date</label>
              <input type='date' name='end_date' id='enddate-input' />
              <label>End Time</label>
              <input type='time' name='end_time' id='endtime-input' />
              <label>Attendees (comma-separated email addresses)</label>
              <input
                type='text'
                name='attendees'
                placeholder='Enter attendee emails'
                id='attendees-input'
              />
              <button
                className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none w-full'
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
