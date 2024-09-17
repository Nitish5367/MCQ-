import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Reg = () => {
  let [data,setData]=useState({})
  let [err,setErr]=useState("")
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let reg=async()=>{
    let res=await axios.post("http://localhost:5001/adduser",data)
    if(res.data=="user added successfully"){
      navigate('/')
    }
    else{
      setErr(res.data)
    }
  }
  return (
    <div>
      {err!=""&&<h3 style={{color:"red"}}>{err}</h3>}
      <input type='text' name='_id' placeholder='enter email' onChange={fun}/>
      <input type='text' name='name' placeholder='enter name' onChange={fun}/>
      <input type='password' name='password' placeholder='enter password' onChange={fun}/>
      <button onClick={reg}>Register</button>
    </div>
  )
}

export default Reg