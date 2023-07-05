import { styled } from 'styled-components';
import { IHeaderProps } from './Header';

export const StyledHeader = styled.header<IHeaderProps>`
    background-color: ${(props) => props.theme.background};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : '1200px')}) {
        display: grid;
        justify-content: initial;
    }
    @media (min-width: ${(props) => (props.layoutbreakpoint ? props.layoutbreakpoint : '768px')}) {
        padding: 0 calc(50px - 3.25rem / 2 / 2);
        min-height: 6vh;
    }
`;
