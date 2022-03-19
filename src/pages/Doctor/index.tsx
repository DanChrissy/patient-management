import { CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Parse from 'parse';
import Checkbox from '../../components/Checkbox';
import Collapsible from '../../components/Collapsible';

import data from '../../assets/data.json';
import { format } from 'date-fns';
import { groupBy } from 'lodash';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/authReducer';

interface DoctorAppObj {
    id: string,
    date: string | Date,
    patient: string,
    status?: string
}

interface GroupedAppObj {
    groupedMonth: string,
    groupAppointments: DoctorAppObj[],
}

const Doctor : FunctionComponent = () => {
    const user = useSelector(getUser);
    const [appointmentsToApprove, setAppointmentsToApprove] = useState<GroupedAppObj[]>([]);

    const [selectedAppointments, setSelectedAppointments] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getAllDoctorAppointments();
    }, []);

    async function getPatientDetails(res: Parse.Object[]) {
        const queryUsers: Parse.Query = new Parse.Query('_User');

        const promisArr = res.map(async item => {
            const patient = await queryUsers.get(item.get('patient').id);
            const updatedResult = {
                id: item.id,
                date: item.get('date'),
                patient: `${patient.get('firstName')} ${patient.get('lastName')}`,
            };
            return updatedResult;
        });
        Promise.all(promisArr)
            .then(promiseRes => {
                handleConfigureData(promiseRes);
            }) 
            .catch(err => {
                handleConfigureData([]);
            })
            .finally(() => setIsLoading(false))
    }

    async function getAllDoctorAppointments() {
        setIsLoading(true);
        setSelectedAppointments([]);
        const queryAppoitments: Parse.Query = new Parse.Query('Appointment');
        const queryUsers: Parse.Query = new Parse.Query('_User');

        try {
            const doctor = await queryUsers.get(user.id);
            queryAppoitments.equalTo('doctor', doctor);
            queryAppoitments.equalTo('status', 'pending');

            try {
                const appRes = await queryAppoitments.find();
                getPatientDetails(appRes);
                // handleConfigureData(appRes);

            } catch (err) {
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
        }
    }

    function handleConfigureData(result: DoctorAppObj[]) {
        if (result.length > 0) {
            const grouped = groupBy(result, ((app: { date: Date }) => format(new Date(app.date), 'MMMM')));
            const groupedSectionArr : any = Object.keys(grouped).map((key: string) => ({
                groupedMonth: key,
                groupAppointments: grouped[key]
            }));
            setAppointmentsToApprove(groupedSectionArr);
        } else {
            setAppointmentsToApprove([]);
        }
    }

    function handleSelecteAppointment(appointmentId: string) {
        let updatedApps = selectedAppointments;
        if (selectedAppointments.includes(appointmentId)) {
            updatedApps = updatedApps.filter(item => item !== appointmentId);
        } else {
            updatedApps = [...updatedApps, appointmentId];
        }

        setSelectedAppointments(updatedApps);
    }

    async function handleUpdateAppointmentStatus(type: string) {
        console.log('Selected appointments:', selectedAppointments);

        const promiseArr = selectedAppointments.map(async item => {
            const query: Parse.Query = new Parse.Query('Appointment');
            const object: Parse.Object = await query.get(item);
            object.set('status', type);
            object.save();
        });

        Promise.all(promiseArr)
            .then(res => {
                alert('Appointments status updated:');
                getAllDoctorAppointments();
            })
            .catch(err => {
                alert('Unable to update status');
                console.log('Appointments could not be updatesd');
            })
        
    }

    return (
        <DoctorWrapper>
            <DoctorContainer>

                <AppointmentSections>
                    <p className='section-title'>Pending Appointments</p>
                    { !isLoading && <AppointmentSectionCollapsible>
                        {appointmentsToApprove.map((group: GroupedAppObj, index: number) => (
                            <div key={`pending-group-${index}`} className="grouped-app">
                                <Collapsible
                                    title={group.groupedMonth}
                                    customTitleStyles={collapsibleTitle}
                                    customContentStyles={collapsibleContent}
                                >
                                    { (group.groupAppointments).map((appointment: any, index: number) => (
                                        <div className='checked-item' key={`pending-appointments-${index}`}>
                                            <Checkbox
                                                selected={selectedAppointments.includes(appointment.id)}
                                                onClick={() => handleSelecteAppointment(appointment.id)}
                                            />
                                            <span className='checked-item-text'>{appointment.patient} - {format(new Date(appointment.date), 'MMMM d, yyyy')}</span>
                                        </div>
                                    ))}
                                </Collapsible>
                            </div>
                        ))}
                        
                    </AppointmentSectionCollapsible> }
                </AppointmentSections>
                
                {appointmentsToApprove.length > 0 &&
                    <StatusButtons>
                        <Button
                            title='Approve Appointments'
                            onClick={() => handleUpdateAppointmentStatus('approved')}
                        />

                        <Button
                            title='Reject Appointments'
                            onClick={() => handleUpdateAppointmentStatus('rejected')}
                        />
                    </StatusButtons>
                }
               
            </DoctorContainer>
        </DoctorWrapper>
    );
}

export default Doctor;

const collapsibleTitle : CSSProperties = {
    border: 'none',
    width: '16rem',
    borderBottom: '1px solid var(--color-purple-700)',
    borderRadius: 0
};

const collapsibleContent : CSSProperties = {
    border: 'none',
    width: 'max-content',
    marginLeft: 'var(--space-16)',
    marginTop: 'var(--space-10)'
}

const DoctorWrapper = styled.div`
    height: 100vh;
    width: 100vw;

    margin: 0;
    padding: 0;
`;

const DoctorContainer = styled.div`
    width: calc(100% - var(--space-48));
    height: calc(100% - var(--space-48));

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: var(--space-24);

`;

const AppointmentSections = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    .section-title {
        margin-bottom: var(--space-48);
        font-family: 'DM Sans';
        font-size: var(--font-24);
        font-weight: 500;
        font-style: normal;
        color: var(--color-gray-800);
        text-align: center;
    }

`;

const AppointmentSectionCollapsible = styled.div`
    margin-bottom: var(--space-14);
    :last-of-type{ margin-bottom: 0; }

    display: flex;
    flex-direction: row;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-row-gap: var(--space-14);
    grid-column-gap: var(--space-8);

    .grouped-app {
        /* margin-bottom: var(--space-18);
        :last-of-type{ margin-bottom: 0; } */
    }

    .checked-item {
        display: flex;
        align-items: center;

        margin-bottom: var(--space-10);
        :last-of-type { margin-bottom: 0; }
    }

    .checked-item-text {
        margin-left: var(--space-12);
    }
`;

const StatusButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;

    margin-top: var(--space-32);

    button {
        width: 11.5rem;
        height: 2.75rem;
        :hover {
            background-color: var(--color-white);
            color: var(--color-black);
        }
        :first-of-type {
            margin-right: var(--space-14);
            :hover {
                border: 2px solid var(--color-purple-700);
            }
        }
        :last-of-type {
            background-color: var(--color-red-600);

            :hover {
                background-color: var(--color-white);
                border: 2px solid var(--color-red-600);
            }

        }
    }
`;