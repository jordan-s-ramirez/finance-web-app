import React, {useState} from "react";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from "@mui/material/InputLabel";
import { Input, Alert } from "@mui/material";
import { motion } from "framer-motion"
import TaxBreakDown from "./taxBreakdown";

export default function IncomeBreakdown() {
  const [salary, setSalary] = useState([])
  const [salaryStatus, setSalaryStatus] = useState("info")

  const handleInput = (e) => {
    var inputValue = e.target.value.match(/\d+/g)
    if(inputValue === null) {
      setSalaryStatus("info")
      setSalary([])
    }
    else {
      setSalaryStatus("success")
      setSalary(e.target.value.match(/\d+/g))

    }
  }


  return(
    <>
      <Alert severity={salaryStatus} elevation={0}>
        <InputLabel htmlFor="standard-adornment-amount">Yearly Salary</InputLabel>
        <Input
          id="standard-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          value={salary}
          onChange={(e)=>{handleInput(e)}}
        />
      </Alert>
      {salary.map((obj,idx)=>{
        return(
          <motion.div
            // animate={{ x: 100 }}
            key={idx}
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
            <TaxBreakDown salary={obj}/>
          </motion.div>
        ) 

      })}
    
    </>
  )
}