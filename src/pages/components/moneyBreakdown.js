import React, {useState} from "react";
import { Stack, IconButton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BreakdownInput from "./breakdownInput";
import { motion } from "framer-motion";
import { useRhinoState } from "react-rhino";

export default function MoneyBreakDown(props) {
  const [data, setData] = useRhinoState("data")
  const [category, setCategory] = useState("")
  const [percent, setPercent] = useState("")

  function handleAddItem() {
    if(percent === "" || category === "") {
      alert("Must put a value")
      return
    }

    var newData = Array.from(data)
    newData.push([category, percent])
    setData(newData)
    setCategory("")
    setPercent("")
  }

  return(
    <>
      <Stack direction='column'>
        {data.map((obj, idx)=>{
          return(
            // <Grid item key={idx} sx={12} sm={12} md={12} lg={12}>
              <Stack direction="row" spacing={1}>
                <BreakdownInput data={data} obj={obj} idx={idx} setData={setData}/>
              </Stack>
            // </Grid>
          )
        })}
      </Stack>
      <Stack direction="row"spacing={1} style={{marginTop:'1vh'}}>
        <TextField label="Category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
        <TextField label="Percent" value={percent} onChange={(e)=>{setPercent(e.target.value.match(/\d+/g))}} style={{width:'50%'}}/>
        <IconButton onClick={()=>{handleAddItem()}}>
          <AddCircleIcon/>
        </IconButton>
      </Stack>
      <motion.div
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%"
        }}
        onClick={()=>{props.setIsGenerate(true)}}
      >
        <button className="projButton" style={{marginTop:'1vh'}}>Generate Projections</button>
      </motion.div>
    </>
  )
}