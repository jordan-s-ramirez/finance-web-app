import React from "react";
export default function BreakdownInput(props) {

  function handleUpdateItem(newItem, idx) {
    var newData = Array.from(props.data)
    newData[idx] = newItem
    props.setData(newData)
  }

  function handleRemoveItem(idx) {
    var newData = Array.from(props.data)
    if (idx > -1) { // only splice array when item is found
      newData.splice(idx, 1); // 2nd parameter means remove one item only
    }
    props.setData(newData)
  }

  return(
    <>
      <input className="breakdownInput" value={props.obj[0]} onChange={(e)=>{handleUpdateItem([e.target.value, props.obj[1]], props.idx)}}/>
      <input className="breakdownInput" value={props.obj[1]} onChange={(e)=>{handleUpdateItem([props.obj[0], e.target.value], props.idx)}}/>
      <button className="deleteButton" onClick={()=>{handleRemoveItem(props.idx)}}>delete</button>
    </>
  )
}