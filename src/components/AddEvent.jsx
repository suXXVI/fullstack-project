import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { AuthContext } from "./AuthProvider";
import { addNewEvent } from "../reducers/eventSlice";

export default function AddEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [days, setDays] = useState("");
  const [time, setTime] = useState("");

  // const { currentUser } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");

  const handleAddEvent = async () => {
    const eventData = {
      title: title,
      type: type,
      days: days,
      time: time,
      username: userId,
    };

    try {
      dispatch(addNewEvent(eventData));
      // console.log(userId);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleSetDays = (e) => {
    setDays(e.target.value);
  };

  const handleSetTime = (e) => {
    setTime(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
        <div className='flex justify-between w-full'>
          <button
            onClick={() => navigate("/dashboard")}
            type='button'
            className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
          >
            Go back
          </button>
        </div>
        <div className='flex flex-col justify-center items-center mx-auto w-96 border-2 p-2 mt-10'>
          <form className='flex flex-col gap-4 w-full'>
            <p className='text-stone-600'>Event Title:</p>
            <input
              onChange={handleSetTitle}
              value={title}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='Title'
            />
            <p className='text-stone-600'>Event Type:</p>
            <input
              onChange={handleSetType}
              value={type}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='Type'
            />

            <p className='text-stone-600'>Days available:</p>
            <input
              onChange={handleSetDays}
              value={days}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='Days available'
            />
            <p className='text-stone-600'>Timing:</p>
            <input
              onChange={handleSetTime}
              value={time}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='Timing'
            />
            <button
              onClick={handleAddEvent}
              type='button'
              className='whitespace-nowrap rounded relative inline-flex group items-center justify-center px-4 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white text-sm'
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
