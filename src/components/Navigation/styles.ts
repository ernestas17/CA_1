import { styled } from 'styled-components';
import { INavigationProps } from './Navigation';

export const StyledNav = styled.nav<INavigationProps>`
    width: 100%;
    min-height: 3.5rem;
    display: flex;
    position: relative;
    align-items: center;
    z-index: 99;

    i {
        display: flex;
        height: 3.25rem;
        width: 3.25rem;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.theme.color};
        cursor: pointer;
    }

    i:hover {
        background-color: ${(props) => props.theme.hovercolor};
    }

    ul {
        display: none;
        flex-direction: column;
        align-items: end;
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
        width: 100%;

        li {
            transition: 0.2s;
            display: flex;
            align-items: stretch;
            display: flex;
            height: 100%;
            width: 100%;
            background-color: transparent;
            color: #4a4a4a;

            a {
                transition: 0.2s;
                color: white;
                line-height: 1.5;
                padding: 0.5rem 0.75rem;
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: ${(props) => (props.burgeralign ? props.burgeralign : 'end')};
                background-color: transparent;
                color: #4a4a4a;
            }
        }

        li:hover {
            a {
                background-color: #fafafa;
                color: #4a4a4a;
            }
        }
        li.active {
            a {
                background-color: ${(props) => props.theme.activecolor};
                color: ${(props) => props.theme.color};
            }
        }
    }

    ul.active {
        display: flex;
        background-color: white;
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.11);
    }

    @media (min-width: 768px) {
        ul {
            width: initial;
        }
    }

    @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : '1200px')}) {
        align-items: stretch;
        width: initial;
        justify-content: ${(props) => (props.desktopalign ? props.desktopalign : 'center')};

        i {
            display: none;
        }

        ul,
        ul.active {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            position: initial;
            transform: initial;
            background-color: transparent;
            box-shadow: none;
            padding: 0;

            li {
                padding: initial;
                width: initial;

                a {
                    color: ${(props) => props.theme.color};
                    background-color: transparent;
                    justify-content: center;
                }

                a:hover {
                    background-color: ${(props) => props.theme.hovercolor};
                    color: ${(props) => props.theme.color};
                }
            }

            li.active a {
                background-color: ${(props) => props.theme.hovercolor};
                color: ${(props) => props.theme.color};
            }
        }
    }
`;

export const StyledBurgerWrapper = styled.div<INavigationProps>`
    width: 100%;
    display: flex;
    justify-content: ${(props) => (props.burgeralign ? props.burgeralign : 'end')};

    @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : '1200px')}) {
        width: initial;
        justify-content: ${(props) => (props.desktopalign ? props.desktopalign : 'center')};
    }
`;
