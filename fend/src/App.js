import React,{useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Examst from './Examst'
import Reg from './Reg'
import Gc from './Gc'
import Ass from './Ass'

function App() {
  let [data,setData]=useState({})
  let fun=(data)=>{
    setData(data)
  }
  let obj={"data":data,"fun":fun}
  return (
    <BrowserRouter>
    <Gc.Provider value={obj}>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/landingpage' element={<Examst/>}/>
      <Route path='/Reg' element={<Reg/>}/>
      <Route path='/exam' element={<Ass/>}/>
    </Routes>
    </Gc.Provider>
    </BrowserRouter>
  )
}

export default App