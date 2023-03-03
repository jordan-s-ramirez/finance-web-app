import React from "react";
import './global.css'
import MainPage from "./components/main";
import { RhinoProvider } from 'react-rhino';

const store = {
  toProject: false,
  salary: 0,
  data: []
 }

export default function IndexPage() {

  return(
    <RhinoProvider store={store}>
      <MainPage/>
    </RhinoProvider>
  )
}