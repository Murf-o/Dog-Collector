
import { StyledDogPage, StyledPageWrapper } from "./styles/StyledMyPage";
import DogPage from "./DogPage";
import { blue } from "@mui/material/colors";
import { useParams, useNavigate } from "react-router-dom";

function MyPage(){
  const { username } = useParams()
  const navigate = useNavigate()
  return(
    
    <StyledPageWrapper>
      <StyledDogPage $color={blue[200]}>
        <DogPage username={username} navigate={navigate} />
      </StyledDogPage>
    </StyledPageWrapper>
    
  )
}



  export default MyPage;