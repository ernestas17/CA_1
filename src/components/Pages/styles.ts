import styled from 'styled-components';
import { IPageProps } from './types';

export const StyledMain = styled.main<IPageProps>`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: stretch;

    input,
    select {
        padding: 5px;
    }

    @media (min-width: ${(props) => (props.layoutbreakpoint ? props.layoutbreakpoint : '1200px')}) {
        min-height: 88vh;
        padding: 50px;
    }
`;

export const StyledSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-shadow: 0 15px 20px 3px lightgray;
`;

export const StyledSectionHeadingWrapper = styled.div`
    font-size: 20px;
    font-weight: 600;
    background-color: ${(props) => props.theme.background};
    color: white;
    padding: 20px;
    border-radius: 10px 10px 0 0;

    @media (min-width: 768px) {
        font-size: 24px;
    }
`;

export const StyledSectionContent = styled.div`
    padding: 20px;
    border: 3px solid ${(props) => props.theme.background};
    border-top: none;
    width: 100%;
    height: 100%;
    border-radius: 0 0 5px 5px;
`;

// --- Valiutu skaiciuokle styles

export const StyledWrapper = styled.div`
    display: flex;
    gap: 50px;
    width: 100%;
`;

export const StyledAddNewCurrencyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    .currency-output-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .currency-output-list img {
        max-width: 24px;
    }
`;

export const StyledYearSelectWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    input {
        padding: 5px;
        border: none;
        outline: none;
    }

    input:active {
        border: none;
    }
`;
export const StyledSelectedCurrencyWrapper = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    & > div {
        display: flex;
        flex-direction: column;
    }
`;

export const StyledAddNewCurrencyWrapper = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    & > div {
        display: flex;
        flex-direction: column;
    }
`;

export const StyledDivider = styled.div`
    height: 1px;
    background-color: #485fc730;
    margin: 10px 0 20px 0;
`;
