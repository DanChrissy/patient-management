import { ChangeEvent, FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import Parse from 'parse';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Record from '../../components/Record';
import { StyledTypes } from '../../components/InputField';
import AppointmentList, { AppointmentObj } from './AppointmentsList';
import Dropdown from '../../components/Dropdown';
import { GroupMenuItems, MenuItem } from '../../components/Dropdown/MenuItems';
import { format } from 'date-fns';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../../store/appointmentsReducer';
import doctors from '../../assets/doctorsData.json';
import { getUser } from '../../store/authReducer';

const Appointment : FunctionComponent = () => {
    const dispatch = useDispatch(); 
    const user = useSelector(getUser);

    const [appointment, setAppointment] = useState<{date: string, doctor: any}>({ date: '', doctor: {}});
    const [errors, setErrors] = useState<string[]>([]);
    const [allDoctors, setAllDoctors] = useState<Parse.Object[]>([]);

    const [shouldLoad, setShouldLoad] = useState<boolean>(false);

    useEffect(() => {
        async function getAllDoctors() {
            const queryRoles: Parse.Query = new Parse.Query('_Role');
            const queryUsers: Parse.Query = new Parse.Query('_User');
            queryRoles.equalTo('name', 'Doctor');
            try {
                const res = await queryRoles.find();
                const doctorRole = res[0];
                queryUsers.equalTo('role', doctorRole);

                try {
                    const usersRes = await queryUsers.find();
                    setAllDoctors(usersRes);

                    console.log('Doctor Users: ', usersRes );
                } catch (err) {
                    console.log('Could not get doctor: ', err);
                }
            } catch (err) {
                alert('Unable to select role.');
            }
        }
        getAllDoctors();
    }, []);

    function handleSelectDoctor(value: any) {
        setAppointment({
            ...appointment,
            doctor: value
        })
    }

    function handleSelectDate(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.currentTarget;
        setAppointment({
            ...appointment,
            date: value
        })
    }

    function validateSubmission() {
        let valid = true;
        let validateError : string[] = [];
        if (!appointment.date) {
            validateError.push('date');
        }
        if (Object.keys(appointment.doctor).length === 0) {
            validateError.push('doctor');
        }

        if (validateError.length > 0) valid = false;
        setErrors(validateError);

        return valid;
    }

    async function handleSetAppointment() {
        setShouldLoad(false);
        let valid = validateSubmission();
        if (!valid) return;

        const appointmentObject: Parse.Object = new Parse.Object('Appointment');
        const queryUser: Parse.Query = new Parse.Query('_User');

        const formattedDate = appointment.date.replace(/-/g, '\/');

        const date = new Date(formattedDate);
        const status = 'pending';
        const doctor = appointment.doctor;

        try {
            const patient = await queryUser.get(user.id);
            appointmentObject.set('date', date);
            appointmentObject.set('doctor', doctor);
            appointmentObject.set('status', status);
            appointmentObject.set('patient', patient);

            try {
                const result: Parse.Object = await appointmentObject.save();
                setShouldLoad(true);
                setAppointment({ date: '', doctor: ''});
                alert('Appointment sent for approval');
            } catch (error: any) {
                console.error('Error while creating appointment: ', error);
            }
        } catch (err) {
            console.log('Err: ', err);
        }
    }

    return (
        <AppoitnmentWrapper>
            <AppointmentContainer>
                <SetAppointmentContainer>
                    <Record
                        title='Apppointment Date'
                        type="date"
                        styledType={StyledTypes.LARGE}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        onChange={handleSelectDate}
                        error={{
                            hasError: errors.includes('date'),
                            errorMsg: 'Please select a date'
                        }}
                    />
                    <Record
                        title='Doctor'
                        customField={
                            <Dropdown
                                styledType={StyledTypes.LARGE}
                                error={errors.includes('doctor')}
                                trigger={
                                    <div>
                                        {Object.keys(appointment?.doctor).length > 0 ? `${appointment?.doctor.get('firstName')} ${appointment?.doctor.get('lastName')}` : 'No Doctor Selected'}
                                    </div>
                                }
                                customContainerStyes={{
                                    width: '15rem',
                                }}
                            >
                                <GroupMenuItems title='DOCTORS' >
                                    {allDoctors.map((doctor: Parse.Object, index: number) => {
                                        return (
                                            <MenuItem
                                                title={`${doctor.get('firstName')} ${doctor.get('lastName')}`}
                                                onClick={() => handleSelectDoctor(doctor)}
                                            />
                                        )
                                    })}
                                </GroupMenuItems>
                                
                            </Dropdown>
                        }
                    />
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 'var(--space-24)'}}>
                        <Button
                            title='Set Appointment'
                            customStyles={{
                                height: '2.75rem',
                                width: 'max-content'
                            }}
                            onClick={handleSetAppointment}
                        />
                    </div>
                </SetAppointmentContainer>
                <PreviousAppointments>
                    <p>Patient's Appointments</p>
                    <AppointmentList reload={shouldLoad} handleReload={() => setShouldLoad(false)}/>
                </PreviousAppointments>
            </AppointmentContainer>
        </AppoitnmentWrapper>
    )
}

export default Appointment;

const AppoitnmentWrapper = styled.div`
    height: 100%;
    width: 100%;

    margin: 0;
`;

const AppointmentContainer = styled.div`
    height: calc(100% - var(--space-48));
    padding: var(--space-24);
    background-color: var(--color-gray-200);

    display: flex;
    flex-direction: column;
`;

const SetAppointmentContainer = styled.div`
    /* margin: 0 var(--space-24); */
    display: grid;
    align-content: center;
    justify-content: center;
    grid-template-columns: 26rem max-content auto;
    grid-column-gap: var(--space-14);
`;

const PreviousAppointments = styled.div`
    display: flex;
    flex-direction: column;

    width: 25rem;
`;