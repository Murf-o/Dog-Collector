import styled from "styled-components";

export const StyledMyButton = styled.button `
  border-radius: 30px;
  border: 2px solid black;
  background-color: ${props => props.$color};
  font-family: sans-serif;
  margin: 100px;
  width: 200px;
  height: 100px;
  cursor: pointer;
  display: inline-block;
  &:hover{
    background-color: ${props => props.$hoverColor}
  }
  &:active {
    background-color: blue;
  }
`