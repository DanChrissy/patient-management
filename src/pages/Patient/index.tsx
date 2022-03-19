import { ChangeEvent, CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';

import { format } from 'date-fns';
import styled from 'styled-components';

import Record from '../../components/Record';
import { getUser, setUser } from '../../store/authReducer';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import { GroupMenuItems, MenuItem } from '../../components/Dropdown/MenuItems';

interface User {
    firstName: string,
    lastName: string,
    address1: string,
    address2?: string,
    city: string,
    parish: string,
    trn: number,
    dob: string
}

const PARISHES = ['Kingston', 'St. Andrew', 'Hanover', 'St. Catherine', 'St. Elizabeth', 'St. James', 'Trelawny',
    'Westmoreland', 'Clarendon', 'Manchester', 'St. Ann', 'St. Mary', 'Portland', 'St. Thomas'
]

const Patient : FunctionComponent = ({ ...navProps }) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState<User | Record<string, any>>();
    const [errors, setErrors] = useState<string[]>();

    useEffect(() => {
        if (user) {
            // console.log('User details: ', user);
            setUserDetails({
                ...user,
                emailAddress: user?.email || '',
                address1: user?.address?.address1 || '',
                address2: user?.address?.address1 || '',
                city: user?.address?.city || '',
                parish: user?.address?.parish || '',
                dob: user?.dateOfBirth ? format(new Date(user?.dateOfBirth), 'yyyy-MM-dd')  : ''
            });
            // Set user details
        }
    }, []);

    function handleOnChangeUserValues(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.currentTarget;
        setUserDetails({
            ...userDetails,
            [name] : value
        })
    }

    function handleSelectParish(value: string) {
        setUserDetails({
            ...userDetails,
            parish: value
        })
    }

    function handleValidation () {
        let valid = true;
        let validateErrors = [];
        if (!userDetails?.firstName) {
            validateErrors.push('firstName');
        }

        if (!userDetails?.lastName) {
            validateErrors.push('lastName');
        }

        if (validateErrors.length > 0) {
            valid = false;
        }

        setErrors(validateErrors);

        return valid;
    }

    async function handleUpdateUser() {
        let isValid = handleValidation();
        if (!isValid) return;

        const address = {
            address1: userDetails?.address1 || '',
            address2: userDetails?.address2 || '',
            city: userDetails?.city || '',
            parish: userDetails?.parish || '',
        }
        const trn = userDetails?.trn || '';
        const firstName = userDetails?.firstName || '';
        const lastName = userDetails?.lastName || '';
        const formattedDate = userDetails?.dob.replace(/-/g, '\/');
        const dateOfBirth = userDetails?.dob ? new Date(formattedDate).toString() : '';

        const query: Parse.Query = new Parse.Query('_User');
        try {
            const object: Parse.Object = await query.get(user.id);
            console.log('Object: ', object);
            object.set('address', address);
            object.set('trn', trn);
            object.set('firstName', firstName);
            object.set('lastName', lastName);
            object.set('dateOfBirth', dateOfBirth);

            try {
                const response: Parse.Object = await object.save();
                const updatedUserDetails : any = {
                    id: response.id,
                    ...response.attributes
                }
                delete updatedUserDetails.sessionToken;
                delete updatedUserDetails.ACL;
                
                dispatch(setUser(updatedUserDetails));
                alert('User successfully updated');
            } catch (error: any) {
                console.error('Error while updating ', error);
                alert('Error updating user');
            }
        } catch (err) {
            console.log('Error updating: ', err);
            alert('Error updating user');

        }
    }

    function handleAddAppointment() {
        navigate('/appointment', { replace: false });
    }

    return (
        <PatientWrapper>
            <PatientContainer>
                <PatientFields>
                    <Record
                        title='First Name'
                        name="firstName"
                        value={userDetails?.firstName || ''}
                        onChange={handleOnChangeUserValues}
                        error={{
                            hasError: errors?.includes('firstName') || false,
                            errorMsg: 'Please enter a value'
                        }}
                    />
                    <Record
                        title='Last Name'
                        name="lastName"
                        value={userDetails?.lastName || ''}
                        onChange={handleOnChangeUserValues}
                        error={{
                            hasError: errors?.includes('lastName') || false,
                            errorMsg: 'Please enter a value'
                        }}
                    />
                    <Record
                        title='Address Line 1'
                        name="address1"
                        value={userDetails?.address1 || ''}
                        onChange={handleOnChangeUserValues}
                    />
                    <Record
                        title='Address Line 2'
                        name="address2"
                        value={userDetails?.address2 || ''}
                        onChange={handleOnChangeUserValues}
                    />
                    <Record
                        title='City'
                        name="city"
                        value={userDetails?.city || ''}
                        onChange={handleOnChangeUserValues}
                    />
                    {/* Change to dropdown */}
                    <Record
                        title='Parish'
                        name="parish"
                        customField={
                            <Dropdown
                                trigger={
                                    <div>
                                        {userDetails?.parish || 'No Parish Selected'}
                                    </div>
                                }
                                customContainerStyes={{
                                    width: 'auto'
                                }}
                            >
                                <GroupMenuItems title='PARISHES' customStyles={{ maxHeight: '10rem', zIndex: 2, overflow: 'auto'}}>
                                    {PARISHES.map((parish: string, index: number) => {
                                        return (
                                            <MenuItem
                                                title={parish}
                                                onClick={() => handleSelectParish(parish)}
                                            />
                                        )
                                    })}
                                </GroupMenuItems>
                                
                            </Dropdown>
                        }
                        value={userDetails?.parish || ''}
                        onChange={handleOnChangeUserValues}
                    />
                    <Record
                        title='TRN'
                        maxLength="9"
                        name="trn"
                        value={userDetails?.trn || ''}
                        onChange={handleOnChangeUserValues}
                    />
                    <Record
                        title='Date Of Birth'
                        name="dob"
                        type='date'
                        value={userDetails?.dob}
                        max={format(new Date(), 'yyyy-MM-dd')}
                        onChange={handleOnChangeUserValues}
                    />
                </PatientFields>

                <PatientButtons>
                    <Button
                        title="Update User"
                        customStyles={buttonStyles}
                        onClick={handleUpdateUser}
                    />
                    <Button
                        title="Add Appointment"
                        customStyles={buttonStyles}
                        onClick={handleAddAppointment}
                    />
                </PatientButtons>

            </PatientContainer>
        </PatientWrapper>
    )
}

export default Patient;

const buttonStyles : CSSProperties = {
    width: '10rem'
}

const PatientWrapper = styled.div`
    height: 100%;
    width: 100%;

    margin: 0;
    padding: 0;
`;

const PatientContainer = styled.div`
    height: calc(100% - var(--space-32));
    width: 100%;

    display: flex;
    flex-direction: column;

    padding-top: var(--space-32);
`;

const PatientFields = styled.div`
    /* height: 100%; */

    display: grid;
    grid-template-columns: repeat(2, 20rem);
    justify-content: center;
    align-content: center;

    grid-column-gap: var(--space-24);
    grid-row-gap: var(--space-14);
`;

const PatientButtons = styled.div`
    margin-top: var(--space-24);
    display: flex;
    flex-direction: row;
    justify-content: center;

    button {
        :first-of-type {
             margin-right: var(--space-14);
        }
    }
    :first-child{
       
    }
`;
