import styled from 'styled-components';

export const StyledCardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;

    @media (min-width: 545px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    @media (min-width: 968px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1238px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
