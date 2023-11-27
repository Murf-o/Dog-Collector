import { TextField } from "@mui/material"
import {React, useState} from "react"

function MyTextField({labelText, state}){

  const handleChange = (e) =>{
    const value = e.target.value
    state.setValue(value)
    
  }

  return (
      <TextField color="primary" variant="outlined" label={labelText} type="number" name="value" value={state.value} onChange={handleChange}/>
  )
}

export default MyTextField;