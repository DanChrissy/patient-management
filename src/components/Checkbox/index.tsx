import { CSSProperties, FunctionComponent } from 'react';
import styled, {css} from 'styled-components';

import { Check } from '@material-ui/icons';

type Props = {
    selected?: boolean,
    onClick?: () => any,
    customStyles?: CSSProperties,
}
const Checkbox : FunctionComponent<Props> = ({ selected = false, customStyles, onClick }) => {
    return (
        <CheckboxContainer style={customStyles} selected={selected} onClick={onClick}>
            {selected && <Check className="checkbox-icon"/>}
        </CheckboxContainer>
    )
};

export default Checkbox;

const CheckboxContainer = styled.div<{selected?: boolean}>`
    height: 1rem;
    width: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--color-gray-600);
    border-radius: 0.25rem;
    background-color: var(--color-white);

    cursor: pointer;

    ${props => props.selected && css`
        border-color: transparent;
        background-color: var(--color-purple-800);
    `}

    .checkbox-icon {
        height: 0.875rem;
        width: 0.875rem;

        color: var(--color-white);
    }
`;