import styled from 'styled-components';

export const StyledDivider = styled.div`
  height: 1px;
  background-color: #485fc730;
  margin: 20px 0 20px 0;
`;

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

export const StyledIputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 3px;
  width: 100%;
`;
export const StyledOutputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 3px;
  width: 100%;
`;
