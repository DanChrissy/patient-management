import { CSSProperties, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

interface BaseProps {
    title: string,
    customStyles?: CSSProperties
}

interface GroupProps extends BaseProps {
    titleStyles?: CSSProperties,
}

interface MenuItemProps extends BaseProps {
    onClick?: () => any,
    disabled?: boolean
}

export const GroupMenuItems : FunctionComponent <GroupProps>= ({ title, customStyles, titleStyles, children }) => {
    return (
        <GroupContainer style={customStyles}>
            <p className='group-title' style={titleStyles}>{title}</p>
            {children}
        </GroupContainer>
    )
}

export const MenuItem : FunctionComponent <MenuItemProps> = ({ title, customStyles, onClick, disabled = false }) => {
    return (
        <MenuItemContainer disabled={disabled} style={customStyles} onClick={() => (!disabled && onClick) && onClick()}>
            {title}
        </MenuItemContainer>
    )
}

const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;

    .group-title {
        margin: 0;

        font-family: 'DM Sans';
        font-size: 0.625rem;
        line-height: 0.625rem;
        font-weight: normal;
        font-style: normal;

        color: var(--color-gray-100);

        padding: 0.25rem var(--space-16);
        margin-bottom: var(--space-8);

        background-color: var(--color-gray-800);
        text-transform: uppercase;
    }
`;

const MenuItemContainer = styled.div<{disabled?: boolean}>`
    padding: 0.5rem 0.625rem;

    display: flex;
    align-items: center;


    font-family: Inter;
    font-size: var(--font-14);
    font-weight: normal;
    font-style: normal;

    color: var(--color-gray-100);

    ${props => !props.disabled && css`
        :hover {
            background-color: var(--color-gray-800);
            cursor: pointer;
        }
    `}


`;