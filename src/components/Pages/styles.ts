import styled from 'styled-components';
import { IPageProps } from './types';

export const StyledMain = styled.main<IPageProps>`
    padding: 35px 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: stretch;

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
    flex-direction: column;
    gap: 20px;
    width: 100%;

    @media (min-width: 1024px) {
        flex-direction: row;
        gap: 50px;
    }
`;

export const StyledAddNewCurrencyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

export const StyledYearSelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;

    @media (min-width: 530px) {
        flex-direction: row;
        align-items: center;
        gap: 10px;

        input {
            width: fit-content;
        }
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
        width: 100%;
    }

    @media (min-width: 530px) {
        select,
        input {
            width: fit-content;
        }
    }
`;

export const StyledAddNewCurrencyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    gap: 10px;

    & > div {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    @media (min-width: 530px) {
        align-items: start;
        flex-direction: row;
        gap: 44px;
        width: fit-content;
    }
`;

export const StyledCurrencyOutputList = styled.div`
    display: grid;
    gap: 10px 20px;
    grid-template-columns: repeat(1, 1fr);

    img {
        max-width: 24px;
        border: 1px solid #485fc7;
        display: flex;
    }

    @media (min-width: 530px) {
        grid-template-columns: repeat(2, max-content);
    }

    @media (min-width: 815px) {
        grid-template-columns: repeat(3, max-content);
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, max-content);
    }
`;
export const StyledSingleOutputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 3px;
    width: 100%;
`;
export const StyledCurrencyOutputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    i {
        transition: 0.2s;
        cursor: pointer;
    }

    i:hover {
        color: ${(props) => (props.theme ? props.theme.background : 'initial')};
    }
`;

export const StyledCurrencyOutputInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledDivider = styled.div`
    height: 1px;
    background-color: #485fc730;
    margin: 20px 0 20px 0;
`;
