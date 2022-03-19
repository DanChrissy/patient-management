import { FunctionComponent, useEffect, useState } from 'react';
import Parse from 'parse';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { DefinedRoute, doctorRoutes, patientRoutes, routes } from '../../navigation';
import { getUser } from '../../store/authReducer';

const Overview : FunctionComponent = () => {
    const user = useSelector(getUser);
    const [userLinks, setUserLinks] = useState<{path: string, name: string}[]>([]);

    useEffect(() => {
        if (user?.role) {
            // console.log('User: ',role)
            const userRoleName = user?.role?.name || ''

            let links : any = [];
            if (userRoleName === 'Patient') {
                links = patientRoutes;
            }
            if (userRoleName === 'Doctor') {
                links = doctorRoutes;
            }

            setUserLinks(links.map((link: { path: any; name: any; }) => {
                return {
                    path: link.path,
                    name: link?.name || '',
                }
            }));
        }
        

    }, [user]);

    return (
        <OverviewWrapper>
            <OverviewContainer>
                <p className='overview-welcome'>Welcome {user?.firstName || ''} {user?.lastName || ''}</p>
                <div className='overivew-instructions'>
                    Please select one of the links to move forward.
                </div>
                <div className='overview-links'>
                    {userLinks.map((link, index) => {
                        return (
                            <UserLink to={link.path}>{link.name}</UserLink>
                        )
                    })}
                </div>
                
            </OverviewContainer>
        </OverviewWrapper>
    )
}

export default Overview;

const OverviewWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const OverviewContainer = styled.div`
    height: calc(100% - var(--space-48));
    width: calc(100% - var(--space-48));

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: var(--space-24);

    font-family: 'DM Sans';
    font-weight: 500;
    font-style: normal;
    color: var(--color-gray-800);
    .overview-welcome {
        margin: 0;

        font-family: 'DM Sans';
        font-size: var(--font-32);
        line-height: var(--font-32);
        font-weight: 500;
        font-style: normal;
        color: var(--color-gray-800);

    }

    .overivew-instructions {
        margin-bottom: var(--space-32);
        margin-top: var(--space-12);
        font-size: var(--font-16);
        line-height: var(--font-16);
    }

    .overview-links {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        
    }
`;

const UserLink = styled(Link)`
    width: 20rem;
    height: 15rem;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--color-purple-300);
    font-size: var(--font-24);
    color: var(--color-black);
    border-radius: 0.5rem;
    text-decoration: none;

    margin-right: var(--space-12);

    :hover {
        height: calc(15rem - 6px);
        background-color: var(--color-white);
        border: 3px solid var(--color-purple-300);
    }
`;