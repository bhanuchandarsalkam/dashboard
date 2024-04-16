import React from 'react'
import Landingpage from './Pages/Landingpage'
import "./App.css";
import {Routes,Route} from "react-router-dom";
import Notfound from './Forms/Notfound';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Landingpage/>}/>
        <Route path="/*" element={<Notfound/>}/>
      </Routes>
    </div>
  )
}

export default App
