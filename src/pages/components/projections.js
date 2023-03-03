import React, {useState} from "react";
import { Alert, Paper, InputLabel, Select, MenuItem, Stack } from "@mui/material";
import { motion } from "framer-motion";
import MoneyBreakDown from "./moneyBreakdown";
import ProjectionChart from "./projectionCharts";

export default function RetirementProjections(props) {
  const [payType, setPayType] = useState(1)
  const [isPaySet, setIsPaySet] = useState(false)
  const [isGenerate, setIsGenerate] = useState(false)

  return(
    <>
      <Stack direction="column" spacing={2}>
        <Alert severity={isPaySet?("success"):("info")} elevation={0}>
          <InputLabel htmlFor="standard-adornment-amount">Pay Type</InputLabel>
          <Stack direction="row" spacing={2}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              variant="standard"
              value={payType}
              label="Age"
              onChange={(e)=>{setPayType(e.target.value)}}
            >
              <MenuItem value={1}>Yearly</MenuItem>
              <MenuItem value={12}>Monthly</MenuItem>
              <MenuItem value={24}>Semi-Monthly</MenuItem>
              <MenuItem value={26}>Bi-Weekly</MenuItem>
            </Select>
            <button className="projButton" onClick={()=>{setIsPaySet(true)}}>continue</button>
          </Stack>
        </Alert>
        {isPaySet?(
          <motion.div
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
            <Alert severity="info">
              <InputLabel htmlFor="standard-adornment-amount">How is your money broken down?</InputLabel>
              <Paper elevation={1} style={{margin:'1vh', padding:'5%'}}>
                <Alert severity="success" style={{marginBottom:'1vh'}}>Per pay period you will take home <b>${props.salary}</b></Alert>
                <MoneyBreakDown setIsGenerate={setIsGenerate}/>
              </Paper>
              {isGenerate?(
                <ProjectionChart payType={payType}/>
              ):(
                <></>
              )}
            </Alert>
          </motion.div>
        )
        :
        (
          <></>
        )
        }
      </Stack>
    </>
  )
}