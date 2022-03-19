import { CSSProperties, FunctionComponent, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';

import { StyledTypes } from '../InputField';

type Props = {
    styledType?: StyledTypes,
    trigger: ReactNode,
    customContainerStyes?: CSSProperties,
    error?:boolean
}

const Dropdown : FunctionComponent <Props> = ({ styledType, trigger, error, customContainerStyes, children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <DropdownWrapper>
            <DropdownTrigger styledType={styledType} error={error} onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </DropdownTrigger>
            {isOpen &&
                <DropdownContainer style={customContainerStyes}>
                    {children}
                </DropdownContainer>
            }
        </DropdownWrapper>
        
    )
}

export default Dropdown;

const DropdownWrapper = styled.div`
    width: auto;

    display: flex;
    flex-direction: column;

    position: relative;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const DropdownTrigger = styled.div<{styledType?: StyledTypes, error?: boolean}>`
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

    ${props => (props.styledType === StyledTypes.LARGE) && css`
        min-width: 25rem;
        min-height: 3rem;

        font-size: var(--font-16);
        font-weight: 500;

        border: 2px solid var(--color-gray-600);

    `}

    ${props => props.error && css`
        border-color: var(--color-orange-600);
        background-color: var(--color-orange-100);
    `}

    ${props => (props.error && (props.styledType === StyledTypes.LARGE)) && css`
        border: 2px solid var(--color-red-600);
        background-color: var(--color-white);
        color: var(--color-black);
    `}
`;

const DropdownContainer = styled.div`
    width: auto;
    min-width: 14rem;
    /* min-width: max-content; */

    position: absolute;
    z-index: 2;
    top: 2.5rem;

    display: flex;
    flex-direction: column;
    margin-top: 0.125rem;

    padding: var(--space-8) 0;
    background-color: var(--color-gray-900);
    color: var(--color-white);

    border-radius: 0.25rem;
`