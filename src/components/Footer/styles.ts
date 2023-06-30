import { styled } from 'styled-components';
import { IFooterProps } from './Footer';

export const StyledFooter = styled.footer<IFooterProps>`
    width: 100%;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 50px;

    @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : '768px')}) {
        min-height: 6vh;
        padding: 0 50px;
    }
`;

export const StyledFooterText = styled.p`
    font-size: 14px;
    color: #4a4a4a;
`;
