import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAppointment } from "../reducers/appointmentSlice";

export default function AddEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  const userId = localStorage.getItem("userId");
  const allAppointments = useSelector(
    (state) => state.appointments.appointments
  );

  const handleAddAppointment = async () => {
    const appointmentData = {
      title: title,
      content: content,
      date: date,
      time: time,
      email: email,
      phone: phone,
      username: userId,
    };

    const isDateAvailable = allAppointments.some(
      (appointment) => appointment.date === date && appointment.time === time
    );

    if (isDateAvailable) {
      setFailedMessage(
        "Time slot not available, please pick a different time."
      );
      console.log("The time and date are not available.");
      return; // Do not proceed with adding the appointment
    }

    try {
      dispatch(addNewAppointment(appointmentData));
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetType = (e) => {
    setContent(e.target.value);
  };

  const handleSetDays = (e) => {
    setDate(e.target.value);
  };

  const handleSetTime = (e) => {
    setTime(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPhone = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
        <div className='flex justify-between w-full'>
          <button
            onClick={() => navigate("/dashboard")}
            type='button'
            className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none'
          >
            Go back
          </button>
        </div>
        <div className='flex flex-col justify-center items-center mx-auto w-96 border-2 p-2 mt-10'>
          <form className='flex flex-col gap-4 w-full'>
            <p className='text-stone-600'>Appointment:</p>
            <select
              onChange={handleSetTitle}
              value={title}
              className='h-10 px-2 border-2'
              type='text'
              placeholder='Title'
              required
            >
              <option>....</option>
              <option>Repair</option>
              <option>Urgent</option>
              <option>Check Up</option>
              <option>Basic Setup</option>
              <option>Full Setup</option>
            </select>

            <p className='text-stone-600'>Description:</p>
            <input
              onChange={handleSetType}
              value={content}
              className='h-10 px-2 border-2 focus:outline-none'
              type='text'
              required
              placeholder='Description'
            />

            <p className='text-stone-600'>Date:</p>
            <input
              onChange={handleSetDays}
              value={date}
              className='h-9 py-3 px-2 border-2 focus:outline-none'
              type='text'
              placeholder='mm-dd-yyy'
            />
            <p className='text-stone-600'>Time:</p>
            <input
              onChange={handleSetTime}
              value={time}
              className='h-9 py-3 px-2 border-2 focus:outline-none'
              type='text'
              placeholder='2:00PM'
            />
            <p className='text-stone-600'>Email:</p>
            <input
              onChange={handleSetEmail}
              value={email}
              className='h-9 py-3 px-2 border-2 focus:outline-none'
              type='text'
              placeholder='example@mail.com'
            />
            <p className='text-stone-600'>Phone:</p>
            <input
              onChange={handleSetPhone}
              value={phone}
              className='h-9 py-3 px-2 border-2 focus:outline-none'
              type='text'
              placeholder='+1 365 2435676'
            />
            <p className='text-red-500 font-light text-xs'>{failedMessage}</p>
            <button
              onClick={handleAddAppointment}
              type='button'
              className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none'
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
