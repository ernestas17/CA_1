import { styled } from 'styled-components';
import { IHeaderProps } from './Header';

export const StyledHeader = styled.header<IHeaderProps>`
    background-color: ${(props) => props.theme.background};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : '1200px')}) {
        padding: 0 50px;
        display: grid;
        justify-content: initial;
    }
`;
