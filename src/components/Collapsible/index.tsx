import { CSSProperties, FunctionComponent, useState } from 'react';
import styled, { css } from 'styled-components';

import { ExpandLess, ExpandMore } from '@material-ui/icons';

type Props = {
    title: string,
    customTitleStyles?: CSSProperties,
    customContentStyles?: CSSProperties,
}
const Collapsible : FunctionComponent <Props> = ({ title, customTitleStyles, customContentStyles, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleToggleCollapsible() {
        setIsOpen(!isOpen);
    }
    return (
        <CollapsibleContainer>
            <CollapsibleTitleContainer isOpen={isOpen} style={customTitleStyles}>
                <span>{title}</span>
                {isOpen ?
                    <ExpandLess className='collapsible-icon' onClick={handleToggleCollapsible}/> :
                    <ExpandMore className='collapsible-icon' onClick={handleToggleCollapsible}/>
                }
            </CollapsibleTitleContainer>
            {isOpen &&
                <CollapsibleContent style={customContentStyles}>
                    {children}
                </CollapsibleContent>
            }
        </CollapsibleContainer>
    )
}

export default Collapsible;

const CollapsibleContainer = styled.div`
    width: auto;
    min-width: 5rem;
    display: flex;
    flex-direction: column;
`;

const CollapsibleTitleContainer = styled.div<{isOpen: boolean}>`
    width: auto;
    height: 3rem;
    padding: var(--space-12) var(--space-14);

    background-color: var(--color-white);

    border: 1px solid var(--color-gray-800);
    border-radius: 0.25rem;
    box-sizing: border-box;

    ${props => props.isOpen && css`
        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    `}

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-family: Inter;
    font-size: var(--font-16);
    line-height: 1rem;
    font-weight: 500;
    font-style: normal;
    color: var(--color-gray-800);

    .collapsible-icon {
        cursor: pointer;
    }

`;

const CollapsibleContent = styled.div`
    width: auto;
    /* margin-top: var(--space-8); */
    /* padding-bottom: var(--space-20); */

    background: var(--color-white);

    border: 1px solid var(--color-gray-800);
    border-top: 0;

    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
`;
