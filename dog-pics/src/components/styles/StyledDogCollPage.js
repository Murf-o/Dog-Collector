import styled from "styled-components";

export const StyledDogCollPage = styled.div`
display: grid;
overflow: none;
position: fixed;
width: 100%;
height: 100%;
left: 0;
top: 0;
z-index: 10;
justify-content: center;
align-items: center;
background-color: ${props => props.$color};
overflow-y: scroll;
`