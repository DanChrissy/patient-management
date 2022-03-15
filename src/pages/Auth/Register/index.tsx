import { ChangeEvent, FunctionComponent, useState } from 'react';
import styled, { css } from 'styled-components';
import Record from '../../../components/Record';
import Button from '../../../components/Button';
import { StyledTypes } from '../../../components/InputField';

const Register : FunctionComponent = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });
    
    const [error, setErrors] = useState<string[]>();

    function handleOnValueChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget;
        setValues({
            ...values,
            [name] : value
        })
    }

    function handleRegisterUser() {

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
                    />
                    <Record
                        title='Last Name'
                        name="lastName"
                        styledType={StyledTypes.LARGE}
                        onChange={handleOnValueChange}
                    />
                    <Record
                        title='Email Address'
                        name="email"
                        styledType={StyledTypes.LARGE}
                        onChange={handleOnValueChange}
                    />
                    <Record
                        title='Password'
                        name="password"
                        styledType={StyledTypes.LARGE}
                        onChange={handleOnValueChange}
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
    height: 100vh;
    width: 100vw;

    margin: 0;
    padding: 0;
`;

const RegisterContainer = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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