import { ChangeEvent, CSSProperties, FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import InputField, { StyledTypes } from '../../../components/InputField';
import Record from '../../../components/Record';

const Login : FunctionComponent = () => {
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

    function handleLoginUser() {
        // Login user by setting token redirect to welcom page

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
                />
                
                <Record
                    title='Password'
                    styledType={StyledTypes.LARGE}
                    type="password"
                    customStyleProps={{ ...loginRecordStyles, marginTop: 'var(--space-12'}}
                    name="password"
                    onChange={handleOnChangeValue}
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
    height: 100vh;
    width: 100vw;

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