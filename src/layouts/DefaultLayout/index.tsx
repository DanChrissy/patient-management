import { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import ApplicationBanner from '../ApplicationBanner';

const DefaultLayout : FunctionComponent = ({ children }) => {
    return (
        <DefaultLayoutWrapper>
            <DefaultLayoutContainer>
                <ApplicationBanner/>
                <div className='content'>
                    {children}
                </div>
            </DefaultLayoutContainer>
        </DefaultLayoutWrapper>
    )
}

export default DefaultLayout;

const DefaultLayoutWrapper = styled.div`
    height: 100vh;
    width: 100vw;
`;

const DefaultLayoutContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    .content {
        flex: 1;
    }
`;