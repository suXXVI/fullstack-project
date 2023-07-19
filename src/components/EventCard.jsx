import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchEventsByUser } from "../reducers/eventSlice";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../reducers/eventSlice";
import { useNavigate } from "react-router-dom";

export default function EventCard() {
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchEventsByUser(userId));
  }, [userId, dispatch]);

  // Delete button
  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  // Edit button
  const handleEditEvent = (eventId) => {
    console.log(eventId);
    navigate(`/editevent/${eventId}`);
  };

  return (
    <div className='flex flex-wrap gap-4'>
      {events.map((event) => (
        <div
          key={event.id}
          className='w-80 max-w-96 p-6  border border-gray-200 rounded-lg sbg-stone-200 shadow-md shadow-slate-300'
        >
          <p href='#' className='flex items-center justify-between'>
            <span className='mb-2 text-2xl font-bold tracking-tight text-gray-800'>
              {event.title}
            </span>
            <a
              className='text-xs text-gray-400'
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete
            </a>
          </p>
          <p>{event.time}</p>
          <p className='text-xs text-gray-400'>{event.days}</p>
          <p className='mb-3 font-normal text-gray-400'>{event.type}</p>

          <div className='flex gap-2'>
            <a
              href='#_'
              className='whitespace-nowrap rounded relative inline-flex group items-center justify-center px-4 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white'
            >
              <span className='relative text-sm'>Open</span>
            </a>
            <a
              onClick={() => handleEditEvent(event.id)}
              href='#_'
              className='whitespace-nowrap rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white'
            >
              <span className='relative text-sm'>Edit</span>
            </a>
            <a
              href='#'
              className='whitespace-nowrap rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white text-sm'
            >
              Share Link
              <svg
                className='w-3.5 h-3.5 ml-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
