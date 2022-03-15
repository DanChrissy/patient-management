import { ChangeEvent, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

export enum StyledTypes {
    LARGE = 'LARGE',
    SMALL = 'SMALL'
}

export interface Error {
    hasError: boolean,
    errorMsg?: string
}

export interface InputProps {
    styledType?: StyledTypes,
    type?: string,
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => any,
    error?: Error,
    [x: string]: any
}

const InputField : FunctionComponent <InputProps> = ({ styledType, type = 'text', value, error={ hasError: false }, onChange, ...props}) => {
    return (
        <InputErrorContainer>
            <Input
                styledType={styledType}
                type={type}
                value={value}
                onChange={onChange}
                error={error.hasError}
                {...props}
            />
            {(error.hasError && error.errorMsg) &&
                <ErrorDisplay styledType={styledType}>{error.errorMsg}</ErrorDisplay>
            }
        </InputErrorContainer>
        
    )
}

export default InputField;

const InputErrorContainer = styled.div`
    width: auto;

    display: flex;
    flex-direction: column;
`;

const Input = styled.input<{styledType?: StyledTypes, error?: boolean}>`
    outline: none !important;

    padding: var(--space-10) var(--space-12);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-800);

    font-family: Inter;
    font-size: var(--font-14);
    font-weight: normal;
    font-style: normal;
    color: var(--color-gray-600);

    border-radius: 0.25rem;
    box-sizing: border-box;

    ::placeholder {
        color: var(--color-gray-400);
    }

    :focus {
        border: 1px solid var(--color-purple-800);

        ${props => (props.styledType === StyledTypes.LARGE) && css`
            border: 2px solid var(--color-purple-800);
        `}

        ${props => (props.error && (props.styledType === StyledTypes.LARGE)) && css`
            border: 2px solid var(--color-red-600);
        `}
    }

    ${props => props.error && css`
        border: 1px solid var(--color-orange-600);
        background-color: var(--color-orange-100);
    `}

    ${props => (props.styledType === StyledTypes.LARGE) && css`
        min-width: 25rem;
        min-height: 3rem;

        font-size: var(--font-16);
        font-weight: 500;

        border: 2px solid var(--color-gray-600);

    `}

    ${props => (props.error && (props.styledType === StyledTypes.LARGE)) && css`
        border: 2px solid var(--color-red-600);
        background-color: var(--color-white);
        color: var(--color-black);
    `}


`;

const ErrorDisplay = styled.div<{styledType?: StyledTypes}>`
    margin-top: var(--space-8);
    padding: var(--space-8);
    border-radius: 0.25rem;

    font-size: var(--font-10);

    color: var(--color-orange-800);
    background-color: var(--color-red-100);

    border: 1px solid var(--color-red-800);

    ${props => (props.styledType === StyledTypes.LARGE) && css`
        font-size: var(--font-12);
    `}

`;