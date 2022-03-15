import { FunctionComponent, CSSProperties } from 'react';
import styled, { css } from 'styled-components';

interface ButtonStyled { 
    outline?: boolean,
    primary?: boolean
}
interface ButtonProps extends ButtonStyled {
    title?: string,
    disabled?: boolean,
    customStyles?: CSSProperties
    onClick?: () => any
}

const Button : FunctionComponent <ButtonProps> = ({ title, disabled, customStyles, onClick, ...props}) => {
    return (
        <ButtonContainer
            type='button'
            onClick={onClick}
            disabled={disabled}
            style={customStyles}
            {...props}
        >
            {title}
        </ButtonContainer>
    )
}

export default Button;

const ButtonContainer = styled.button<ButtonStyled>`
    outline: none;
    border: none;

    width: auto;
    padding: var(--space-12) var(--space-14);

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'DM Sans';
    font-size: var(--font-14);
    font-weight: normal;
    font-size: normal;

    color: var(--color-white);
    background-color: var(--color-purple-800);
    border-radius: 0.25rem;

   cursor: pointer;

   :disabled {
       cursor: default;
   }


`;