import {React, useState} from "react";
import { StyledForm, StyledFormButton, StyledInput, StyledLabel } from "./styles/StyledForm";
import { StyledLoginPage } from "./styles/StyledLoginPage";
import { useNavigate } from 'react-router-dom';
import {Card, FormHelperText, Input, InputLabel} from "@mui/material"
import {  blue, yellow } from "@mui/material/colors";

function LoginPage(){
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[passwordInvalid, setPasswordInvalid] = useState(false);
  const[authenticated, setAuthenticated] = useState(false)
  const[invalidLogin, setInvalidLogin] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const user = e.target[0].value;
    const pass = e.target[1].value;

    if(pass === ""){
      
      setPasswordInvalid(true)
      return;
    }
    const query = {
      username: user,
      password: pass
    }
    //check db if true
    fetch("http://localhost:8080/authenticate", {
      method: "POST",
      body: JSON.stringify(query)
    })
    .then(async resp => {
      const data = await resp.json()
      if(data.authenticated){
        setAuthenticated(true)
      }
      else{
        setInvalidLogin(true)
      }
    })
    .catch(err => console.log(err))
    //END of fetch
  }

  if(authenticated){
    return navigate(`/get-dogs/${username}`)
  }

  return(
    <>
      <StyledLoginPage $color={blue[200]}>
        <h1 style={{margin: "10px 50px"}}>
          {"Login"}
        </h1>
        <Card style={{border: "2px solid black"}} variant="outlined">
          <StyledForm $color={yellow[400]} onSubmit={handleSubmit}>
            
            <InputLabel htmlFor="username">{"Username: "}</InputLabel>
            <Input id="username" type="text" value={username} onChange={(e) => {
              setUsername(e.target.value)
              setInvalidLogin(false)
            }} />
            <InputLabel $invalid={passwordInvalid} htmlFor="password">{"Password: "}</InputLabel>
            <Input id="password" type="text" value={password} onChange={(e) => {
                setPassword(e.target.value)
                setPasswordInvalid(false)
                setInvalidLogin(false)}} />
            <FormHelperText style={{color: "red"}} hidden={!passwordInvalid}>{"Invalid Password"}</FormHelperText>
            <StyledLabel type="submit" value="Login" />
            <FormHelperText style={{color: "red"}} hidden={!invalidLogin}>{"Incorrect Login"}</FormHelperText>
            <StyledFormButton $color={blue[100]} type="submit" >{"Log in"}</StyledFormButton>
            
          </StyledForm>
        </Card>
      </StyledLoginPage>
    </>
  )
}


export default LoginPage;