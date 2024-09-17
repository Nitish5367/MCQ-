import axios from 'axios'
import React,{useContext, useEffect, useState} from 'react'
import Gc from './Gc'
import { Link } from 'react-router-dom'

const Examst = () => {
  let obj=useContext(Gc)
  let [data,setData]=useState({})
  useEffect(()=>{
    axios.get(`http://localhost:5001/getatt/${obj.data._id}`).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return ( 
    <div>
      {
        data.count==0&&<div>
          <h1>please read introduction and start the test</h1>
          <button><Link to={'/exam'}>start</Link></button>
        </div>
      }
      {
        data.count!=0&&<div>
          <h1>previous you attemped {data.count} times</h1>
          <h2>your best score is {data.score}</h2>
          <p>If your are interested to improve your score then attempt start once again</p>
          <button><Link to={'/exam'}>start test</Link></button>
        </div>
      }  
    </div>
  )
}

export default Examst
