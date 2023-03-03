import React, {useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Paper } from '@mui/material';
import { useRhinoValue } from 'react-rhino';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Money vs Time',
    },
  },
};

// Periods
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [2,5,3,7,8,9,4],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1,2,3,8,8,7,4],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};



export default function ProjectionChart(props) {
  const newData = useRhinoValue("data")
  const salary = useRhinoValue("salary")
  const [graphData, setGraphData] = useState(data)
  
  function generateProjection(payPeriod, periods, percent) {
    var moneyPerPay = salary / payPeriod
    var percentAllocation = Math.floor((percent / 100) * moneyPerPay)
    var genData = []
    for(var i = 0 ; i < periods; i++) {
      genData.push(percentAllocation*i)
    }
    return genData
  }


  useEffect(()=>{
    var newGraphData = []
    var newLabels = []
    var plotData = []

    for(var i = 0 ; i < 12; i++) {
      newLabels.push("Period "+i.toString())
      plotData.push(parseInt(props.payType)*i)
    }
    console.log(plotData, props.payType)

    newData.forEach(element => {

      var color = (Math.random() * 255).toString()

      newGraphData.push(
        {
          label: element[0],
          data: generateProjection(props.payType, 12, parseInt(element[1][0])),
          borderColor: 'rgb('+color+', 162, 235)',
          backgroundColor: 'rgba('+color+', 162, 235, 0.5)',
        }
      )  
    });

    setGraphData({labels:newLabels, datasets: newGraphData})

  },[newData, props])

  return (
    <Paper elevation={1} style={{margin:'1vh', padding:'5%'}}>
      <Line options={options} data={graphData} />
    </Paper>
  );
}
