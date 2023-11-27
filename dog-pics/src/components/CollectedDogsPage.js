import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Card, Grid, IconButton, Toolbar } from "@mui/material";
import { StyledDogCollPage } from "./styles/StyledDogCollPage";
import { blue, green } from "@mui/material/colors";
import { StyledMyButton } from "./styles/StyledMyButton";


function CollectedDogsPage(){

  const { username } = useParams()
  const[dogPics, setDogPics] = useState([])

  const navigate = useNavigate()

  const getDogs = async() =>{

    const resp = await fetch(`http://localhost:8080/get-dogs/${username}`, {
      method: "GET",
    })
    const data = await resp.json()
    setDogPics(data.dogList)
  }

  useEffect(() =>{
    getDogs()
  }, [])

  return (
    <>
      <StyledDogCollPage $color={blue[200]}>
      <AppBar position="fixed" color="warning">
        <Toolbar variant="dense">
          <IconButton onClick={() => navigate(`/get-dogs/${username}`)}>Back</IconButton>
        </Toolbar>
      </AppBar>
        <h3 style={{textAlign: "center"}}>Dogs Collected: {dogPics.length}</h3>
        
        <Grid container spacing={2}>
        {dogPics.map((pic, i) =>{
          let url = pic.url
          return(
            <Card style={{margin: "30px"}} key={i} style={{border: "2px solid black"}} variant="outlined">
                <img src={url} alt={"dog pic bro"}  style={{maxWidth: "400px", height:"100%"}} />
            </Card>
          )
        })}
        </Grid>
      </StyledDogCollPage>
    </>
  )
}

export default CollectedDogsPage;