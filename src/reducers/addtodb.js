import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export const saveAppointment = createAsyncThunk(
	'appointments/saveAppointment',
	async ({
		summary,
		location,
		description,
		startDateTime,
		endDateTime,
		attendees,
	}) => {
		try {
			const appointmentsRef = collection(db, 'events');
			const newAppointmentRef = doc(appointmentsRef);

			await setDoc(newAppointmentRef, {
				summary: summary,
				location: location,
				description: description,
				startDateTime: startDateTime,
				endDateTime: endDateTime,
				attendees: attendees,
			});

			const appointment = {
				id: newAppointmentRef.id,
				summary: summary,
				location: location,
				description: description,
				startDateTime: startDateTime,
				endDateTime: endDateTime,
				attendees: attendees,
			};

			console.log('success');
			return appointment;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);
