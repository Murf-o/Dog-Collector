import styled from "styled-components";

export const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex: 0 1 auto;
  background-color: ${props => props.$color};
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
`