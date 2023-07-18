import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center mx-auto max-w-6xl mt-10'>
        <div className='flex justify-between w-full'>
          <h1 className='text-3xl font-extralight'>Events</h1>
          <button
            type='button'
            className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
          >
            + Create Event
          </button>
        </div>

        <div className='flex justify-start w-full gap-5'>
          <div className='max-w-sm p-6  border border-gray-200 rounded-lg bg-stone-200 shadow-md shadow-slate-300'>
            <a href='#'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                Meeting
              </h5>
            </a>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              1hr, One-on-One
            </p>
            <a
              href='#'
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Read more
              <svg
                className='w-3.5 h-3.5 ml-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </a>
          </div>
          <div className='max-w-sm p-6  border border-gray-200 rounded-lg bg-stone-200 shadow-md shadow-slate-300'>
            <a href='#'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                Meeting 2
              </h5>
            </a>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              1hr, One-on-One
            </p>
            <a
              href='#'
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Read more
              <svg
                className='w-3.5 h-3.5 ml-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
