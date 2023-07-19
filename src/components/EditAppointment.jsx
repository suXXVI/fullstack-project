import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAppointment } from "../reducers/appointmentSlice";

export default function EditEvent() {
  const { id } = useParams();
  const appointments = useSelector((state) => state.appointments.appointments);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // checking to see if eventId is passed
  useEffect(() => {
    const appointment = appointments.find(
      (appointment) => appointment.id === parseInt(id)
    );
    if (appointment) {
      setTitle(appointment.title);
      setContent(appointment.content);
      setDate(appointment.date);
      setTime(appointment.time);
      setEmail(appointment.email);
      setPhone(appointment.phone);
    }
  }, [id, appointments]);

  const userId = localStorage.getItem("userId");

  const handleAddEvent = async () => {
    const eventData = {
      title: title,
      content: content,
      date: date,
      time: time,
      email: email,
      phone: phone,
      username: userId,
    };

    try {
      dispatch(
        editAppointment({ appointmentId: id, appointmentData: eventData })
      );
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
            className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            Go back
          </button>
        </div>
        <div className='flex flex-col justify-center items-center mx-auto w-96 border-2 p-2 mt-10'>
          <form className='flex flex-col gap-4 w-full'>
            <p className='text-stone-600'>Event Title:</p>
            <select
              onChange={handleSetTitle}
              value={title}
              className='h-10 px-2 border-2'
              type='text'
              placeholder='Title'
              required
            >
              <option>....</option>
              <option>Urgent</option>
              <option>Check Up</option>
              <option>Follow Up</option>
            </select>

            <p className='text-stone-600'>Event Type:</p>
            <input
              onChange={handleSetType}
              value={content}
              className='h-10 px-2 border-2'
              type='text'
              required
              placeholder='Description'
            />

            <p className='text-stone-600'>Days available:</p>
            <input
              onChange={handleSetDays}
              value={date}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='MM-DD-YYYY'
            />
            <p className='text-stone-600'>Timing:</p>
            <input
              onChange={handleSetTime}
              value={time}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='2:00PM'
            />
            <p className='text-stone-600'>Email:</p>
            <input
              onChange={handleSetEmail}
              value={email}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='example@mail.com'
            />
            <p className='text-stone-600'>Phone:</p>
            <input
              onChange={handleSetPhone}
              value={phone}
              className='h-9 py-3 px-2 border-2'
              type='text'
              placeholder='+1 365 2435676'
            />
            <button
              onClick={handleAddEvent}
              type='button'
              className='whitespace-nowrap rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-red-600 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 border-red-700 text-white'
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
