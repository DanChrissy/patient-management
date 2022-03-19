import { ChangeEvent, CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import Parse, { Role } from 'parse';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../components/Button';
import InputField, { StyledTypes } from '../../../components/InputField';
import Record from '../../../components/Record';
import { validateEmail } from '../../../helpers/validators';
import { getUser, setUser } from '../../../store/authReducer';

const Login : FunctionComponent = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<string[]>([]);

    function handleOnChangeValue(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.currentTarget
        setValues({
            ...values,
            [name]: value
        })
    }

    function validateValues() {
        let isValid = true;
        let validateErrors : string[] = [];
        for(const [key, value] of Object.entries(values)) {
            if (key === 'email') {
                if (!value) {
                    validateErrors.push(key);
                } else {
                    const isEmailValid = validateEmail(value);
                    if (!isEmailValid) {
                        validateErrors.push(key);
                    }
                }
            } else {
                if (!value) {
                    validateErrors.push(key);
                }
            }
        }

        if (validateErrors.length > 0) {
            isValid = false;
        }

        setErrors(validateErrors);


        return isValid;
    }

    async function handleLoginUser() {
        const valid = validateValues();
        if (!valid) { return; }

        try {
            const loggedInUser: Parse.User = await Parse.User.logIn(values.email, values.password);
            const currentUser = await Parse.User.current();
            console.log('Success logged in:', currentUser, loggedInUser);
            if (loggedInUser === currentUser) {

                let updatedUserDetails : any = {
                    id: currentUser.id,
                    ...currentUser.attributes,
                    role: {
                        id: currentUser.get('role').id,
                    },
                }

                const roleQuery: Parse.Query = new Parse.Query('_Role');
                await roleQuery.get(currentUser.get('role').id)
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
            }
        } catch (err) {
            console.log('Login failed:', err);
            alert('Invalid login. Please try again');
        }

    }

    return (
        <LoginWrapper>
            <LoginContainer>

                <Record
                    title='Email Address'
                    styledType={StyledTypes.LARGE}
                    customStyleProps={{ ...loginRecordStyles }}
                    name="email"
                    onChange={handleOnChangeValue}
                    error={{
                        hasError: errors.includes('email'),
                        errorMsg: 'Please enter valid email'
                    }}
                />
                
                <Record
                    title='Password'
                    styledType={StyledTypes.LARGE}
                    type="password"
                    customStyleProps={{ ...loginRecordStyles, marginTop: 'var(--space-12'}}
                    name="password"
                    onChange={handleOnChangeValue}
                    error={{
                        hasError: errors.includes('password'),
                        errorMsg: 'Please enter a password'
                    }}
                />

                <Button
                    title='Login'
                    onClick={handleLoginUser}
                    customStyles={{
                        marginTop: 'var(--space-14)',
                        width: '25rem',
                        fontSize: 'var(--font-18)',
                        textTransform: 'uppercase'
                    }}
                />
            </LoginContainer>
        </LoginWrapper>

    )
}

export default Login;

const loginRecordStyles : CSSProperties = {
    fontFamily: 'DM Sans',
    fontSize: 'var(--font-16)'
}

const LoginWrapper = styled.div`
    height: max-content;
    width: 100%;

    margin: 0;
    padding: 0;
`;

const LoginContainer = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;