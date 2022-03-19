import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Parse from 'parse';
import Record from '../../../components/Record';
import Button from '../../../components/Button';
import { StyledTypes } from '../../../components/InputField';
import { validateEmail } from '../../../helpers/validators';
import { AsyncLocalStorage } from 'async_hooks';
import Dropdown from '../../../components/Dropdown';
import { GroupMenuItems, MenuItem } from '../../../components/Dropdown/MenuItems';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/authReducer';

interface Role {
    id: string,
    attributes: {name: string}
}
const Register : FunctionComponent = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        role: { attributes: { name: '' } }
    });
    const [allRoles, setAllRoles] = useState<Parse.Object[]>([]);
    
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        async function getAllRoles() {
            try {
                const queryRoles = new Parse.Query('_Role');
                const results : Parse.Object[]= await queryRoles.find();
                setAllRoles(results);
            } catch (err) {
                alert('Unable to select role.');
            }
        }
        getAllRoles();
    }, []);

    function handleOnValueChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget;
        setValues({
            ...values,
            [name] : value
        })
    }

    function handleSelectRole(role: any) {
        setValues({
            ...values,
            role: role
        });
    }

    function validateValues() {
        let isValid = true;
        let validateErrors : string[] = [];
        for(const [key, value] of Object.entries(values)) {
            if (key === 'emailAddress') {
                if (!value) {
                    validateErrors.push(key);
                } else {
                    const isEmailValid = validateEmail(values.emailAddress);
                    if (!isEmailValid) {
                        validateErrors.push(key);
                    }
                }
            } else if (key === 'role') {
                if (Object.keys(values.role).length === 0) {
                    validateErrors.push(key);
                } else if (!values?.role?.attributes?.name) {
                    validateErrors.push(key);
                }
            } else {
                if (!value) {
                    validateErrors.push(key);
                }
            }
        }

        if (validateErrors.length > 0) {
            console.log('Vlid error:', validateErrors);
            isValid = false;
        }

        setErrors(validateErrors);
        return isValid;
    }

    async function handleRegisterUser() {
        const valid = validateValues();
        if (!valid) { return; }

        try {
            const newUserObj = new Parse.Object('_User');
            newUserObj.set('username', values.emailAddress);
            newUserObj.set('email', values.emailAddress);
            newUserObj.set('password', values.password);
            newUserObj.set('firstName', values.firstName);
            newUserObj.set('lastName', values.lastName);
            newUserObj.set('role', values.role);

            await newUserObj.save();

            try {
                const loggedIn = await Parse.User.logIn(values.emailAddress, values.password);
                let updatedUserDetails : any = {
                    id: loggedIn.id,
                    ...loggedIn.attributes,
                    role: {
                        id: loggedIn.get('role').id,
                    },
                }

                const roleQuery: Parse.Query = new Parse.Query('_Role');
                await roleQuery.get(loggedIn.get('role').id)
                    .then(res => {
                        const userRole = res.get('name');
                        updatedUserDetails = {
                            ...updatedUserDetails,
                            role: {
                                ...updatedUserDetails.role,
                                name: userRole
                            }
                        }
                    })
                    .catch(err => {
                        console.log('User role could not be found: ', err);
                    })


                delete updatedUserDetails.sessionToken;
                delete updatedUserDetails.ACL;
                
                dispatch(setUser(updatedUserDetails));
                alert('User Registered');

            } catch (err) {
                console.log('Login failed:', err);
                alert('Unable to login registered user');
            }
        } catch (err) {
            console.log('Could not register user: ', err);
            alert('Unable to register user');
        }
    }
    return (
        <RegisterWrapper>
            <RegisterContainer>

                <RegisterFields>
                    <Record
                        title='First Name'
                        name="firstName"
                        styledType={StyledTypes.LARGE}
                        onChange={handleOnValueChange}
                        error={{
                            hasError: errors.includes('firstName'),
                            errorMsg: 'Please enter a value'
                        }}
                    />
                    <Record
                        title='Last Name'
                        name="lastName"
                        styledType={StyledTypes.LARGE}
                        onChange={handleOnValueChange}
                        error={{
                            hasError: errors.includes('lastName'),
                            errorMsg: 'Please enter a value'
                        }}
                    />
                    <Record
                        title='Email Address'
                        name="emailAddress"
                        type='email'
                        styledType={StyledTypes.LARGE}
                        onChange={handleOnValueChange}
                        error={{
                            hasError: errors.includes('emailAddress'),
                            errorMsg: 'Please enter a valid email'
                        }}
                    />
                    <Record
                        title='Password'
                        name="password"
                        type='password'
                        styledType={StyledTypes.LARGE}
                        onChange={handleOnValueChange}
                        error={{
                            hasError: errors.includes('password'),
                            errorMsg: 'Please enter correct password'
                        }}
                    />

                    <Record
                        title='ROLE'
                        customField={
                            <Dropdown
                                styledType={StyledTypes.LARGE}
                                error={errors.includes('role')}
                                trigger={
                                    <div>
                                        {values?.role?.attributes?.name || 'No Role Selected'}
                                    </div>
                                }
                                customContainerStyes={{
                                    width: '15rem',
                                }}
                            >
                                <GroupMenuItems title='ROLES' >
                                    {allRoles.map((role: Parse.Object, index: number) => {
                                        return (
                                            <MenuItem
                                                title={role?.attributes?.name}
                                                onClick={() => handleSelectRole(role)}
                                            />
                                        )
                                    })}
                                </GroupMenuItems>
                                
                            </Dropdown>
                        }
                    />
                </RegisterFields>
                

                <Button
                    title='Register'
                    onClick={handleRegisterUser}
                    customStyles={{
                        width: '25rem',
                        fontSize: 'var(--font-18)',
                        textTransform: 'uppercase'
                    }}
                />
            </RegisterContainer>
        </RegisterWrapper>
    )
}

export default Register;

const RegisterWrapper = styled.div`
    height: max-content;
    width: 100%;

    margin: 0;
    padding: 0;
`;

const RegisterContainer = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
`

const RegisterFields = styled.div`
    /* height: 100%; */
    margin-bottom: var(--space-20);

    display: grid;
    justify-content: center;
    align-content: center;

    grid-template-columns: repeat(2, 26rem);
    grid-column-gap: var(--space-20);
    grid-row-gap: var(--space-12);
`;