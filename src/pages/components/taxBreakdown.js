import React, {useState, useEffect} from "react";
import InputLabel from "@mui/material/InputLabel";
import { Alert, Paper, Input, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { PieChart } from "./pie";
import { useRhinoState } from 'react-rhino';

export default function TaxBreakDown(props) {
  const [state, setState] = useState("")
  const [postTax, setPostTax] = useState("")
  const [, setToProject] = useRhinoState("toProject");
  const [, setSalary] = useRhinoState("salary");

  useEffect(()=>{
    var postTaxSalary = parseInt(props.salary) * 0.72
    setPostTax(postTaxSalary.toString())
  },[props])

  const handleButton = () => {
    console.log("Button Press")
    setSalary(parseInt(postTax))
    setToProject(true)
  }

  const handleInput = (e) => {
    setState(e.target.value)
  }

  return(
    <Alert severity="info" elevation={0} style={{marginTop:'1vh'}}>
      <InputLabel htmlFor="standard-adornment-amount">Income Breakdown</InputLabel>
      <Paper elevation={1} style={{margin:'1vh', padding:'1%'}}>
        <InputLabel htmlFor="standard-adornment-amount">This is your salary before taxes</InputLabel>
        <Alert severity="error" elevation={2} style={{margin:'1em'}}>
          Pre-tax: <b>{"$"+props.salary}</b> yearly salary
        </Alert>
        <div style={{marginLeft:'2vw'}}>
          <InputLabel htmlFor="standard-adornment-amount">State of Residence</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={state}
            onChange={(e)=>{handleInput(e)}}
            onCl
            style={{marginBottom:'1vh'}}
          />
        </div>
        
        {state === "" ? 
        (
          <></>
        )
        :
        (
          <motion.div
              // animate={{ x: 100 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                default: {
                  duration: 0.1,
                  ease: [0, 0.71, 0.2, 1.01]
                },
                scale: {
                  type: "linear",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}
            >
              <Alert severity="success" elevation={1} style={{margin:'1em'}}>
                Post-tax: <b>{"$"+postTax}</b> yearly salary
              </Alert>
              <Grid container>
                <Grid item sm={6} md={6} lg={6}>
                  <Alert severity="warning" elevation={1} style={{margin:'1em'}}>
                  Note: You lost <b>{Math.floor((1-parseInt(postTax)/parseInt(props.salary))*100)}%</b> on taxes
                  </Alert>
                  <Alert severity="info" elevation={1} style={{margin:'1em'}}>
                  Tip: Be sure to diversify for portfilio
                  </Alert>
                  <Alert severity="info" elevation={1} style={{margin:'1em'}}>
                    <motion.div
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%"
                      }}
                    >
                      <button className="projButton" onClick={()=>{handleButton()}}>Explore Retirement Projections</button>
                    </motion.div>
                  </Alert>
                </Grid>
                <Grid item sm={6} md={6} lg={6} style={{padding:'1em'}}>
                  <Paper elevation={1} style={{padding:'0.5em'}}>
                    <div style={{height:'200px', width:'200px'}}>
                      <PieChart preTax={props.salary} postTax={postTax}/>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
        )
        }
      </Paper>
    </Alert>
  )
}