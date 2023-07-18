import Navbar from "./Navbar";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import { UseSelector } from "react-redux/es/hooks/useSelector";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10 px-20'>
        <div className='flex justify-between w-full'>
          <h1 className='text-3xl font-extralight'>Events</h1>
          <button
            onClick={() => navigate("/addevent")}
            type='button'
            className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
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
