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

  const { title, content, fromDate, toDate, email } = appointment;

  return (
    <div>
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
        <h2>Set your Appointment</h2>
        <h3>{email}</h3>

        <div className='flex flex-row w-full justify-between mt-10'>
          <div className=''>
            <h2>{title}</h2>
            <p>{content}</p>
            <p>Days available</p>
            <p>
              {fromDate} to {toDate}
            </p>
          </div>

          <div className='flex-1 max-w-md'>
            <form className='form flex flex-col gap-5' id='event_form'>
              {/* Your form elements here */}
              <button type='button' id='add_event_button'>
                Set Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
