import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { AuthContext } from './AuthProvider';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from './AppLogo';

export default function SignupPage() {
	const [failedMessage, setFailedMessage] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const auth = getAuth();
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) navigate('*');
	}, [currentUser, navigate]);

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				username,
				password
			);
			console.log(res.user);
		} catch (error) {
			console.error(error);
			if (password.length < 4) {
				setFailedMessage('Password too short.');
			} else if (error.code === 'auth/email-already-in-use') {
				setFailedMessage('Email already in use.');
			} else {
				setFailedMessage('An error occured please try again.');
			}
		}
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen mx-auto'>
			<AppLogo />
			<div className='flex flex-col max-w-md h-100 w-72 border border-black shadow-md p-10'>
				<form className='flex flex-col gap-4'>
					<input
						onChange={(e) => setUsername(e.target.value)}
						className='h-9 py-3 px-2 border-2 rounded-md focus:outline-none'
						type='text'
						placeholder='Email or Username'
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						className='h-9 p-3 border-2 rounded-md focus:outline-none'
						type='password'
						placeholder='Password'
					/>
					<p className='text-red-500 font-light text-xs'>{failedMessage}</p>
					<div className='w-full flex flex-col mt-5'>
						<a
							onClick={handleSignUp}
							href='#_'
							className='relative inline-block px-4 py-2 font-medium group text-center'
						>
							<span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
							<span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
							<span className='relative text-black group-hover:text-white '>
								Sign Up
							</span>
						</a>
						<p className='flex flex-row mb-3 gap-1 text-xs text-stone-400 mt-5'>
							Already have an account?
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
						<p className='text-xs text-stone-400'>
							By singing up, you agree to the{' '}
							<span className='text-black'>terms of Serivce</span> and{' '}
							<span className='text-black'>Privacy Policy</span>, including
							Cookie Use. <span className='text-black'>Learn more.</span>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
