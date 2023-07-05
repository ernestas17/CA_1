import styled from 'styled-components';

export const StyledCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    transition: 0.3s;

    &:hover {
        transform: translateY(-5px);

        box-shadow: 0px 2em 3em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02);
        color: #4a4a4a;
    }

    @media (min-width: 768px) {
        min-height: 475px;
    }

    @media (min-width: 1238px) {
        min-height: 430px;
    }
`;
export const StyledCardHeading = styled.h2`
    font-size: 20px;
    font-weight: 500;
    margin: 10px 0;
`;
export const StyledCardImage = styled.img`
    /* display: flex; */
`;
export const StyledCardDescription = styled.p`
    font-size: 16px;
    color: gray;
    /* display: flex; */
`;
