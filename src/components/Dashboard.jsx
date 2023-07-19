import Navbar from "./Navbar";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.appointments.isLoading);

  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
        <div className='flex justify-between items-center w-full'>
          {isLoading ? (
            <div className='lds-ellipsis'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <p className='text-2xl text-gray-800 font-extralight'>
              Appointments
            </p>
          )}
          <button
            onClick={() => navigate("/add")}
            className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-purple-600 rounded-lg hover:bg-purple-700 focus:shadow-outline focus:outline-none'
          >
            + Create Event
          </button>
        </div>

        {/* events container */}
        <div className='flex justify-start w-full mt-5'>
          <EventCard />
        </div>
      </div>
    </div>
  );
}
