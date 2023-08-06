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
							href='#_'
							className='relative inline-block px-4 py-2 font-medium group text-center'
						>
							<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
							<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
							<span className='relative text-black group-hover:text-white '>
								Reset Passwrod
							</span>
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
