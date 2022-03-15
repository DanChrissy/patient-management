import { FunctionComponent, lazy, ReactNode } from 'react';

const Auth = lazy(() => import('../pages/Auth'));
const Patient = lazy(() => import('../pages/Patient'));
const Doctor = lazy(() => import('../pages/Doctor'));
const Appointment = lazy(() => import('../pages/Appointment'));

export interface DefinedRoute {
    path: string,
    element: ReactNode,
    caseSensitivity?: boolean
}

const authRoute = {
    path: '/auth',
    element: <Auth/>,
    caseSensitivity: true
};

const welcomRoute = {
    path: '/',
    element: <div>Overview</div>,
    caseSensitivity: true
}

const patientRoute = {
    path: '/patient',
    element: <Patient/>,
    caseSensitivity: true
};

const doctorRoute = {
    path: '/doctor',
    element: <Doctor/>,
    caseSensitivity: true
};

const appointmentRoute = {
    path: '/auth',
    element: <Appointment/>,
    caseSensitivity: true
};

const routes = [authRoute, welcomRoute, patientRoute, doctorRoute, appointmentRoute];

export default routes;
