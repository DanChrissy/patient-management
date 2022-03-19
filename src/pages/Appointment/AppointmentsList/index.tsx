import { groupBy } from 'lodash';
import { FunctionComponent, useEffect, useState } from 'react';
import Parse from 'parse';
import styled, { css } from 'styled-components';
import {format} from 'date-fns';

import Collapsible from '../../../components/Collapsible';
import { appointmentSelectors, setAppointments } from '../../../store/appointmentsReducer';
import { store } from '../../../store';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/authReducer';

export interface AppointmentObj {
    id: string,
    date: string,
    patient: string,
    doctor: string,
    status: string,
}

interface AppointmentGroup {
    groupTitle: string,
    groupDates: AppointmentObj[]
}

const AppointmentList : FunctionComponent <{reload?: boolean, handleReload: () => void}>= ({ reload, handleReload }) => {
    const user = useSelector(getUser);
    const appointments : any[] = appointmentSelectors.selectAll(store.getState());
    const [patientAppointments, setPatientAppointments] = useState<AppointmentGroup[]>([]);

    useEffect(() => { getPatientAappointments(); }, []);

    useEffect(() => {
        if (reload) {
            getPatientAappointments();
        }
    }, [reload]);

    async function getPatientAappointments() {
        const queryAppoitments: Parse.Query = new Parse.Query('Appointment');
        const queryUsers: Parse.Query = new Parse.Query('_User');

        try {
            const patient = await queryUsers.get(user.id);
            queryAppoitments.equalTo('patient', patient);

            try {
                const appRes = await queryAppoitments.find();
                configureAppointments(appRes);
                handleReload();
            } catch (err) {

            }
        } catch (err) {

        }
    };

    function configureAppointments(result: Parse.Object[]) {
        const updatedResults = result.map(item => ({
            date: item.get('date'),
            doctor: `${item.get('doctor').get('firstName')} ${item.get('doctor').get('lastName')}`,
            status: item.get('status'),
        }))
        const groupedAppointments = groupBy(updatedResults, ((app: AppointmentObj) => format(new Date(app.date), 'MMMM')));
        const groupedArr : any = Object.keys(groupedAppointments).map((key: string) => ({
            groupTitle: key,
            groupDates: groupedAppointments[key]
        }))
        setPatientAppointments(groupedArr);
    }
    return (
        <PatientAppointments>
            {
                patientAppointments.map((appGroup: AppointmentGroup, index: number) => (
                    <div key={`collapse-app-${Math.random() + index}`} className="collapse-app">
                        <Collapsible title={appGroup.groupTitle}>
                            <AppointmentContent>
                                {appGroup.groupDates.map((appointment: AppointmentObj, index: number) => {
                                    return (
                                        <p key={`appointment-${Math.random() + index}`} className="appointment">
                                            <span className='bold'>{format(new Date(appointment.date), 'MMM d, yyyy')} @ {format(new Date(appointment.date), 'hh:mm') }</span> appointment by Doctor <span className='bold'>{appointment.doctor}</span> - <span className='bold'>{appointment.status}</span>
                                        </p>
                                    )
                                })}
                            </AppointmentContent>
                        </Collapsible>
                    </div>
                    
                ))
            }
        </PatientAppointments>
        
    )
}

export default AppointmentList;

const PatientAppointments = styled.div`
    display: flex;
    flex-direction: column;

    .collapse-app {
        margin-bottom: var(--space-12);
        :last-of-type { margin-bottom: 0; }
    }
`;

const AppointmentContent = styled.div`
    margin: var(--space-12) var(--space-14);

    display: flex;
    flex-direction: column;

    .appointment {
        margin: 0;
        font-family: Inter;
        font-size: var(--font-12);
        line-height: var(--font-14);
        font-weight: 400;
        font-style: normal;
        color: var(--color-gray-800);

        margin-bottom: var(--space-12);

        ::before {
            content: '+';
            margin-right: var(--space-8);
        }

        :last-of-type{ margin-bottom: 0; }
    }

    .bold {
        font-weight: bold;
    }

`;