import React from "react"
import {useEffect, useState} from "react";
import MyTextField from "./MyTextField";
import { StyledMyButton } from "./styles/StyledMyButton";
import { blueGrey, green, yellow } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';

function DogPage({username, navigate}) {

  const[imageUrl, setImageUrl] = useState();
  

  //runs on first render
  useEffect(() =>{
    getNewDog();
  }, [])
  
  const getNewDog = async() =>{
    
    const resp = await fetch('https://dog.ceo/api/breeds/image/random');
    const mess = await resp.json();
    const url = mess.message;
    setImageUrl(url);

    const data = {
      username: username,
      url: url
    }
    console.log("data:", data)
    //add said dog to user collection
    const fetchResp = await fetch("http://localhost:8080/add-dog", {
      method: "POST",
      body: JSON.stringify(data)
    })
    console.log("resp: ", fetchResp)
  }

  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  const imgHeight = {
    value: height,
    setValue: setHeight
  };

  const imgWidth = {
    value: width,
    setValue: setWidth
  };

  return (
  <>      
    <StyledMyButton $color={green[50]} $hoverColor={green[400]}  onClick={() => navigate(`/user-dogs/${username}`)}>View Collected Dogs</StyledMyButton>
    <img src={imageUrl} alt={"dog pic bro"} width={width} height={height} onError={getNewDog}  style={{maxWidth: "700px", maxHeight:"700px"}} />
    <StyledMyButton $color={blueGrey[50]} $hoverColor={yellow[400]}  onClick={getNewDog}>New Pic</StyledMyButton>
    <MyTextField labelText={"Width: "} state={imgWidth} />
    <MyTextField labelText={"Height: "} state={imgHeight} />
  </>);
}
export default DogPage;