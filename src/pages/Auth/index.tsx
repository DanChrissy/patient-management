import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Patient from '../Patient';

const AUTH_PATHS = [
    {
        path: '/auth/login',
        title: 'Login'
    },
    {
        path: '/auth/register',
        title: 'Register'
    },
];

const Auth : FunctionComponent = () => {
    const location = useLocation();
 
    return (
        <AuthWrapper>
            <AuthContainer>
                <AuthPaths>
                    {AUTH_PATHS.map((link, index) => {
                        return (
                            <AuthLink
                                key={`auth-link-${index}`}
                                to={link.path}
                                className={({ isActive }) => isActive ? 'activeLink' : undefined}
                            >
                                {link.title}
                            </AuthLink>
                        )
                    })}
                </AuthPaths>
                {(location.pathname === '/auth/login' || location.pathname === '/auth') &&
                    <Login/>
                }
                {location.pathname === '/auth/register' &&
                    <Register/>
                }
               
            </AuthContainer>
        </AuthWrapper>
        
    )
}

export default Auth;

const AuthWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const AuthContainer = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .auth-content {
        flex: 1;
        background-color: blue;
    }
`;

const AuthPaths = styled.div`
    display: flex;
    flex-direction: row;
    /* align-items: center;
    justify-content: center; */

    margin-bottom: var(--space-32);

    margin-top: var(--space-14);

    .activeLink {
        text-decoration: underline;
    }
`;

const AuthLink = styled(NavLink)`
    font-family: 'Inter';
    font-size: var(--font-24);
    line-height: var(--font-24);
    font-weight: 500;
    font-style: normal;
    color: var(--color-gray-800);

    text-decoration: none;

    :first-of-type {
        margin-right: var(--space-14);
    }

    :hover {
        color: var(--color-purple-600);
    }
`;