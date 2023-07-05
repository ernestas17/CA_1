import styled from 'styled-components';

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
