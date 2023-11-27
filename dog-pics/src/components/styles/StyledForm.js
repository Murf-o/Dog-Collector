import styled from "styled-components"

export const StyledForm = styled.form`
  background-color: ${props => props.$color};
  padding: 50px;
  border-radius: 10px;
`

export const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
  color: ${props => props.$invalid ? 'red' : 'black'};
`

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid red;
`

export const StyledFormButton = styled.button`
  display: block;
  background-color: black;
  color: white;
  border-radius: 20px;
  margin: auto;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: ${props => props.$color};
    color: black;
  }
`