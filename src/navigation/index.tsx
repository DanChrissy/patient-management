import { FunctionComponent, lazy, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { getUser, isAuthenticated } from '../store/authReducer';

const Auth = lazy(() => import('../pages/Auth'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));

const Patient = lazy(() => import('../pages/Patient'));
const Overview = lazy(() => import('../pages/Overview'));
const Doctor = lazy(() => import('../pages/Doctor'));
const Appointment = lazy(() => import('../pages/Appointment'));

export interface DefinedRoute {
    path: string,
    name?: string,
    element: ReactNode,
    caseSensitivity?: boolean,
    requireAuth?: boolean,
    children?: DefinedRoute[]
}

const PublicRoute = ({ element }: {element: any} ) => {
    const authenticated = useSelector(isAuthenticated);
    return authenticated ? <Navigate to="/" /> : element;
}

const PrivateRoute = ({ element }: {element: any}) => {
    const authenticated = useSelector(isAuthenticated);
    return !authenticated ? <Navigate to="/auth/login" replace/> : element;
}

const authRoute = {
    path: '/auth',
    element: <PublicRoute element={<Auth/>}/>,
    children: [
        {
            path: '',
            element: <Login/>,
        },
        {
            path: 'login',
            element: <Login/>,
        },
        {
            path: 'register',
            element: <Register/>,
        }
    ]
};

const welcomRoute = {
    path: '/',
    element: <PrivateRoute element={<Overview/>}/>,
    requireAuth: true,
}

const patientRoute = {
    path: '/patient',
    name: 'Patient Record',
    element: <PrivateRoute element={<Patient/>}/> ,
    caseSensitivity: true,
    requireAuth: true,
};

const doctorRoute = {
    path: '/doctor',
    name: 'Doctor Appointments',
    element: <PrivateRoute element={ <Doctor/>}/>,
    caseSensitivity: true,
    requireAuth: true,
};

const appointmentRoute = {
    path: '/appointment',
    name: 'Patient Appointments',
    element: <PrivateRoute element={<Appointment/>}/>,
    caseSensitivity: true,
    requireAuth: true,
};

export const routes = [authRoute, welcomRoute];
export const patientRoutes = [patientRoute, appointmentRoute];
export const doctorRoutes = [doctorRoute];
