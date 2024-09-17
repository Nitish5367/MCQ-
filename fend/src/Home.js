import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Gc from './Gc'
import axios from 'axios'

function Home() {
    let [data,setData]=useState({})
    let obj=useContext(Gc)
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let login=async()=>{
        try{
            let res=await axios.post("http://localhost:5001/login",data)
            if(res.data.token!=undefined){
                obj.fun(res.data)
                navigate("/landingpage")
            }
            else{
                setErr(res.data.err)
            }
        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div>
        <div>
            {err!=""&&<h1 style={{color:"red"}}>{err}</h1>}
            <input type='text' placeholder='enter email' name='_id' onChange={fun}/>
            <input type='password' placeholder='enter password' name='password' onChange={fun}/>
            <button onClick={login}>Login</button>
        </div>
        <div>
            If you doesn't have account 
            <button><Link to={'/Reg'}>click here to register</Link></button>
        </div>
    </div>
  )
}

export default Home