import { styled } from 'styled-components';

export const StyledHeader = styled.header`
    padding: 20px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 1200px) {
        padding: 20px 50px;
    }
`;
