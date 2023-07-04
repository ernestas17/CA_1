import styled from 'styled-components';
import { ISumaZodziais } from './SumaZodziais';

export const StyledWrapper = styled.div<ISumaZodziais>`
    height: 100%;
    gap: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (min-width: 768px) {
        padding: 20px;
        gap: initial;
    }
`;

export const StyledDivider = styled.div<ISumaZodziais>`
    margin: 0 20px;
    height: 1px;
    background-color: ${(props) => (props.theme ? props.theme.background : 'initial')};
    opacity: 0.2;
`;

export const StyledTop = styled.div`
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
        text-align: center;
        font-size: 16px;
        color: black;
        border-left: none;
        border-right: none;
        border-top: none;
        border-radius: 0;
    }
    label {
        text-align: center;
        width: 100%;
        display: block;
        line-height: 1.3em;
        font-size: 16px;
        margin-bottom: 10px;
    }

    @media (min-width: 768px) {
        height: 20%;
        padding: 20px;

        label {
            font-size: 18px;
        }

        input {
            width: 50%;
            font-size: 22px;
        }
        width: 100%;
    }
`;

export const StyledBottom = styled.div<ISumaZodziais>`
    height: 80%;

    .output {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100%;
        font-weight: 300;
        padding: 20px;
        background-color: ${(props) => (props.theme ? props.theme.background : 'initial')};
        color: ${(props) => (props.theme ? props.theme.color : 'initial')};
        border-radius: 0 0 5px 5px;
    }

    @media (min-width: 768px) {
        padding: 20px;

        .output {
            font-size: 32px;
            padding: 20px 50px;
        }
    }
`;
