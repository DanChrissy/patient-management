import { FunctionComponent, CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import InputField, { InputProps } from '../InputField';

interface RecordProps extends InputProps {
    title: string,
    customStyleProps?: CSSProperties
}

const Record : FunctionComponent <RecordProps> = ({ title, customStyleProps, ...props}) => {
    return (
        <RecordContainer style={customStyleProps}>
            <p>{title}</p>
            <InputField
                {...props}
            />
        </RecordContainer>
    )
}

export default Record;

const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;

    font-family: Inter;
    font-size: var(--font-14);
    font-weight: normal;
    font-style: normal;
    color: var(--color-gray-600);

    p { margin: 0; margin-bottom: var(--space-8);}

`;