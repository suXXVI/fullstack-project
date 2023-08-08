import timesync from '../assets/timesync.png';

export default function AppLogo() {
	return (
		<div className='flex flex-col justify-center items-center gap-2 mb-10'>
			<img className='h-10' src={timesync} alt='' />
			<p className='text-xs text-stone-400 mt-3'>
				Seamlessly manage your meetings and appointments.
			</p>
		</div>
	);
}
