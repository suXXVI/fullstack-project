import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import useLocalStorage from "use-local-storage";

export default function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useLocalStorage("userId", null);

  const handleLogout = () => {
    auth.signOut();
    setUserId(null);
  };
  if (!userId) {
    navigate("*");
  }

  return (
    <nav className='border-gray-200 bg-stone-200 shadow-lg shadow-gray-300'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center'>
          <img src={logo} className='h-8 mr-3' alt='Flowbite Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'></span>
        </a>
        <button
          onClick={handleLogout}
          type='button'
          className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
