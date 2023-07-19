import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAppointmentsByUser } from "../reducers/appointmentSlice";
import { useDispatch } from "react-redux";
import { deleteAppointment } from "../reducers/appointmentSlice";
import { useNavigate } from "react-router-dom";
import { fetchAllAppointments } from "../reducers/appointmentSlice";

export default function EventCard() {
  const appointments = useSelector((state) => state.appointments.appointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const isAdmin = useSelector((state) => state.appointments.isAdmin);

  useEffect(() => {
    if (isAdmin === true) {
      dispatch(fetchAllAppointments());
      console.log("admin loggin in");
    } else {
      dispatch(fetchAppointmentsByUser(userId));
    }
  }, [userId, isAdmin, dispatch]);

  // Delete button
  const handleDelete = (appointmentId) => {
    dispatch(deleteAppointment(appointmentId));
  };

  // Edit button
  const handleEdit = (appointmentId) => {
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
            {isAdmin ? (
              <a
                className='text-xs text-gray-400 cursor-pointer'
                onClick={() => handleDelete(appointment.id)}
              >
                Complete
              </a>
            ) : (
              <a
                className='text-xs text-gray-400 cursor-pointer'
                onClick={() => handleDelete(appointment.id)}
              >
                Delete
              </a>
            )}
          </p>
          <p>{appointment.time}</p>
          <p className='text-xs text-gray-400'>{appointment.date}</p>
          <p className='mb-3 font-normal text-gray-400'>
            {appointment.content}
          </p>

          {isAdmin ? (
            <p></p>
          ) : (
            <div className='flex gap-2'>
              <button
                onClick={() => handleEdit(appointment.id)}
                className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none w-full'
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
