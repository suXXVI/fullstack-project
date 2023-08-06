import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { AuthContext } from './AuthProvider';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/fflogo.png';
import timesync from '../assets/timesync.png';

export default function LoginPage() {
	const [failedMessage, setFailedMessage] = useState('');
	const [username, setUsername] = useState('');

	const auth = getAuth();
	const { currentUser } = useContext(AuthContext);
	const userId = localStorage.getItem('userId');

	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser && userId == null) {
			navigate('*');
		}
	}, [currentUser, userId, navigate]);

	// reset password
	const handlePasswordReset = async (e) => {
		e.preventDefault();
		try {
			await sendPasswordResetEmail(auth, username);
			setFailedMessage('Please check your email');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen mx-auto'>
			<div className='flex flex-col justify-center items-center gap-2 mb-10'>
				<img className='h-10' src={timesync} alt='' />
				<p className='text-xs text-stone-400 mt-3'>
					Seamlessly manage your meetings and appointments.
				</p>
			</div>
			<div className='flex flex-col max-w-md h-96 w-72 border border-stone-300 shadow-md shadow-stone-400  p-10 rounded-lg'>
				<form className='flex flex-col gap-4'>
					<input
						onChange={(e) => setUsername(e.target.value)}
						className='h-9 py-3 px-2 border-2 rounded-md'
						type='text'
						placeholder='Email or Username'
					/>
					<p className='text-red-500 font-light text-xs'>{failedMessage}</p>
					<div className='w-full flex flex-col mt-7'>
						<a
							onClick={handlePasswordReset}
							type='button'
							className='relative inline-flex items-center justify-center p-4 px-5 py-2 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-stone-800 rounded-md shadow-md group mb-3 cursor-pointer'
						>
							<span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease'>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									></path>
								</svg>
							</span>
							<span className='absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease'>
								Reset Password
							</span>
							<span className='relative invisible'>Button Text</span>
						</a>

						<p className='flex flex-row justify-center items-center gap-1 text-xs text-stone-400 mt-7'>
							Go back to
							<span>
								<a
									onClick={() => navigate('/login')}
									className='text-black'
									href=''
								>
									Login
								</a>
							</span>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
