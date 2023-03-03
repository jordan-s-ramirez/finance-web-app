import React, {useState} from "react";
import { Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import IncomeBreakdown from "./income";
import RetirementProjections from "./projections";
import { useRhinoValue } from 'react-rhino';
export default function MainPage() {
  const [start, setStart] = useState(false)
  const toProject = useRhinoValue("toProject");
  const salary = useRhinoValue("salary");

  return(
      <div className="body">
          <h1 style={{textAlign:'center', color:'white'}}>Finance Web App</h1>
        <div className="rowItem">
          {start ? 
          (
            <>
            <Stack direction="column" spacing={2} className="mainStack">
              <Paper elevation={4} className="paperItem">
                <h2>Income Breakdown</h2>
                <IncomeBreakdown/>
              </Paper>
              <Paper elevation={4} className="paperItem">
                <h2>Retirement Projections</h2>
                {toProject ? (
                  <RetirementProjections salary={salary}/>
                ):(
                  <></>
                )}
              </Paper>
              {/* <Paper elevation={4} className="paperItem">
                <h2>Save & Export</h2>
              </Paper> */}
            </Stack>
            </>
          )
          :
          ( 
            <button className="startButton" onClick={()=>{setStart(true)}}>Fill Out Form</button>
          )
          }
        </div>
      </div>
  )
}