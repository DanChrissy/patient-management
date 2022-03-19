import { createSlice, createEntityAdapter, current, EntityId } from '@reduxjs/toolkit';
import { getUser } from './authReducer';

interface AppointmentState {
    id: string,
    date: string,
    doctor: string,
    patient: string,
    status: string,
}
const DEFAULT_STATE : AppointmentState = {
    id: '',
    date: '',
    doctor: '',
    patient: '',
    status: '',
}

const appointmentsAdapter = createEntityAdapter();

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: appointmentsAdapter.getInitialState(DEFAULT_STATE),
    reducers: {
        setAppointments: (state, action) => {
            appointmentsAdapter.setAll(state, action.payload)
        },
        addAppointment: (state, action) => {
            const currentId : string = current(state).ids.slice(-1)[0].toString();
            const nextId = (parseInt(currentId) + 1).toString();
            const newAppointment = { id: nextId, ...action.payload};
            appointmentsAdapter.addOne(state, newAppointment);
        },
        updateAppointment: appointmentsAdapter.updateOne,
        updateAppointments: appointmentsAdapter.updateMany,
        removeAppointment: (state, action) => {
            appointmentsAdapter.removeOne(state, action.payload);
        },
        resetAppointments: () => {
            return appointmentsAdapter.getInitialState(DEFAULT_STATE);
        }
    }
})

export const appointmentSelectors = appointmentsAdapter.getSelectors((state : any) => state.appointment);
export const { setAppointments, addAppointment, updateAppointment, updateAppointments, removeAppointment, resetAppointments } = appointmentSlice.actions;

export default appointmentSlice.reducer;