import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Parse from "parse";
import { isAuthenticated, setUser } from '../../store/authReducer';

const ApplicationBanner = () => {
    const authenticated = useSelector(isAuthenticated);
    const dispatch = useDispatch();

    async function handleLogout() {
        try {
            await Parse.User.logOut();
            const currentUser = Parse.User.current();
            if (currentUser === null) {
                dispatch(setUser({}));
            }
        } catch (err) {
            alert('Could not log out');
        }
    }
    return (
        <BannerContainer>
            Patient Management System
            {authenticated && <Logout onClick={() => handleLogout()}>Logout</Logout> }
        </BannerContainer>
    )
}

export default ApplicationBanner;

const BannerContainer = styled.div`
    min-height: 5rem;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Inter';
    font-size: var(--font-48);
    line-height: var(--font-48);
    color: var(--color-white);
    background-color: var(--color-purple-800);
    text-transform: uppercase;

    position: relative;
`;

const Logout = styled.div`
    height: 100%;
    width: max-content;

    position: absolute;
    right: var(--space-16);

    font-size: var(--font-16);
    line-height: var(--font-16);

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

`;