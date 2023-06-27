import { styled } from 'styled-components';
import { INavigationProps } from './Navigation';

export const StyledNav = styled.nav<INavigationProps>`
    width: 100%;

    ul {
        display: none;
        flex-direction: column;
        align-items: end;
        gap: 10px;
        position: absolute;
        right: 0;
        bottom: -5px;
        transform: translateY(100%);

        li {
            text-decoration: underline;
            text-decoration-color: transparent;
            transition: 0.2s;
            font-size: 12px;

            a {
                transition: 0.2s;
            }

            &:hover,
            &.active {
                a {
                    color: blue;
                }
            }
        }
    }

    i {
        display: flex;
    }

    ul.active {
        display: flex;
        background-color: white;
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.11);
        gap: 15px;
        padding: 15px;
    }

    @media (min-width: 768px) {
        ul {
            gap: 20px;
            padding: 20px;

            li {
                font-size: 14px;
            }
        }
    }

    @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : '1200px')}) {
        ul,
        ul.active {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 50px;
            position: initial;
            transform: initial;
            background-color: transparent;
            box-shadow: none;
            padding: 0;

            li {
                font-size: 16px;
                padding: initial;
            }
        }

        i {
            display: none;
        }
    }
`;

export const StyledListWraper = styled.div<INavigationProps>`
    width: 100%;
    position: relative;
    justify-content: ${(props) => (props.burgeralign ? props.burgeralign : 'end')};
    display: flex;

    @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : '1200px')}) {
        justify-content: center;
    }
`;
