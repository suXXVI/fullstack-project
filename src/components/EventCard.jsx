import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchEventsByUser } from "../reducers/appointmentSlice";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../reducers/appointmentSlice";
import { useNavigate } from "react-router-dom";

export default function EventCard() {
  const appointments = useSelector((state) => state.appointments.appointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchEventsByUser(userId));
  }, [userId, dispatch]);

  // Delete button
  const handleDeleteEvent = (appointmentId) => {
    dispatch(deleteEvent(appointmentId));
  };

  // Edit button
  const handleEditEvent = (appointmentId) => {
    console.log(appointmentId);
    navigate(`/edit/${appointmentId}`);
  };

  return (
    <div className='flex flex-wrap gap-4'>
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className='w-80 max-w-96 p-6  border border-gray-200 rounded-lg sbg-stone-200 shadow-md shadow-slate-300'
        >
          <p href='#' className='flex items-center justify-between'>
            <span className='mb-2 text-2xl font-bold tracking-tight text-gray-800'>
              {appointment.title}
            </span>
            <a
              className='text-xs text-gray-400 cursor-pointer'
              onClick={() => handleDeleteEvent(appointment.id)}
            >
              Delete
            </a>
          </p>
          <p>{appointment.time}</p>
          <p className='text-xs text-gray-400'>{appointment.date}</p>
          <p className='mb-3 font-normal text-gray-400'>
            {appointment.content}
          </p>

          <div className='flex gap-2'>
            <a
              onClick={() => handleEditEvent(appointment.id)}
              href='#_'
              className='w-full whitespace-nowrap rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-red-600 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 border-red-700 text-white'
            >
              <span className='relative text-sm'>Edit</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
