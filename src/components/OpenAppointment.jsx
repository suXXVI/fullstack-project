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
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  // checking to see if eventId is passed
  useEffect(() => {
    const appointment = appointments.find(
      (appointment) => appointment.id === parseInt(id)
    );
    if (appointment) {
      setTitle(appointment.title);
      setContent(appointment.content);
      setFromDate(appointment.fromdate);
      setToDate(appointment.todate);
      setFromTime(appointment.fromtime);
      setToTime(appointment.totime);
      setEmail(appointment.email);
      setPhone(appointment.phone);
    }
  }, [id, appointments]);

  const userId = localStorage.getItem("userId");

  //this will now add the appointment to google calendar
  const handleAddAppointment = async () => {
    const eventData = {
      title: title,
      content: content,
      fromdate: fromDate,
      fromtime: fromTime,
      totime: toTime,
      todate: toDate,
      email: email,
      phone: phone,
      userid: userId,
    };

    try {
      dispatch(
        editAppointment({ appointmentId: id, appointmentData: eventData })
      );
      // navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
      setFailedMessage("An error while trying to save changes.");
    }
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetType = (e) => {
    setContent(e.target.value);
  };

  const handleSetFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const handleSetToDate = (e) => {
    setToDate(e.target.value);
  };

  //Set time available
  const handleSetFromTime = (e) => {
    setFromTime(e.target.value);
  };

  const handleSetToTime = (e) => {
    setToTime(e.target.value);
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
        <h2>Set your Appointment</h2>
        <div className='flex justify-between w-full'>
          <button
            onClick={() => navigate("/dashboard")}
            type='button'
            className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none'
          >
            Go back
          </button>
        </div>

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
              <label htmlFor='summary'>Summary</label>
              <input
                type='text'
                name='summary'
                placeholder='Summary'
                id='summary-input'
              />
              <label htmlFor='location'>Location</label>
              <input
                type='text'
                name='location'
                placeholder='Location'
                id='location-input'
              />
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                name='description'
                placeholder='Description'
                id='description-input'
              />
              <label htmlFor='start_date'>Start Date</label>
              <input type='date' name='start_date' id='startdate-input' />
              <label htmlFor='start_time'>Start Time</label>
              <input type='time' name='start_time' id='starttime-input' />
              <label htmlFor='end_date'>End Date</label>
              <input type='date' name='end_date' id='enddate-input' />
              <label htmlFor='end_time'>End Time</label>
              <input type='time' name='end_time' id='endtime-input' />
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
