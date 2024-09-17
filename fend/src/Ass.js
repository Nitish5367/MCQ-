import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Gc from './Gc'
import './Ass.css'

const Ass = () => {
  let [qns,setqns]=useState([])
  let [ans,setAns]=useState({})
  let [score,setScore]=useState()
  let [f,setf]=useState(true)
  let obj=useContext(Gc)
  let [prev,setPrev]=useState("")

  let fun=(e)=>{
    setAns({...ans,[e.target.name]:e.target.value})
  }

  let store=()=>{
    let sc=0
    for(let i=0;i<10;i++){
      if(ans[qns[i]._id]==qns[i].ans){
        sc=sc+1
      }
    }
    setScore(sc)
    setf(false)
    axios.get(`http://localhost:5001/upres/${sc}/${obj.data._id}`).then((res)=>{
        if(res.data.msg=="fa"){
          setPrev("")
        }
        else{
          setPrev(res.data.msg)
        }
    })
  }

  useEffect(()=>{
    axios.get("http://localhost:5001/getqns").then((res)=>{
    setqns(res.data)
    
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div>
      {f&&<div>
        <h1>Answer all question</h1>
        {
          qns.map((item,i)=>{
            return(<div>
              <h1>{i+1}.{item.q}</h1>
              <div><input type='radio' name={item._id} onChange={fun} value='op1' />{item.op1}</div>
              <div><input type='radio' name={item._id} onChange={fun} value='op2' />{item.op2}</div>
              {item.op3!=undefined&&<div><input type='radio' name={item._id} value='op3' onChange={fun}/>{item.op3}</div>}
              {item.op4!=undefined&&<div><input type='radio' name={item._id} value='op4' onChange={fun}/>{item.op4}</div>}
              {item.op5!=undefined&&<div><input type='radio' value="op5" name={item._id} onChange={fun}/>{item.op5}</div>}
              </div>)
          } )
        }
          <button onClick={store}>Submit</button>
        </div>}
        {!f&& <div>
    <h1>Your score is:{score}</h1>
    {prev!=""&&<h1>your prev max Score was:{prev}</h1>}

    {
    
        qns.map((item,i)=>{
          return(
            <div>
              <h1>{i+1} . {item.q}</h1>
          {ans[item._id]=="op1" ?<div className={ans[item._id]==qns[i].ans?"green":"red"}>  <input type='radio' value="op1" name={item._id}  checked readOnly disabled/>{item.op1}</div>:   <div className={item.ans=="op1"&&'green'}>  <input type='radio' value="op1" name={item._id}  readOnly disabled/>{item.op1}</div>}

          {ans[item._id]=="op2" ?<div className={ans[item._id]==qns[i].ans?"green":"red"}>  <input type='radio' value="op2" name={item._id}  checked readOnly disabled/>{item.op2}</div>:   <div className={item.ans=="op2"&&'green'} >  <input type='radio' value="op2" name={item._id}  readOnly disabled/>{item.op2}</div>}

         {item.op3!=undefined && <div>{ans[item._id]=="op3" ?<div className={ans[item._id]==qns[i].ans?"green":"red"}>  <input type='radio' value="op3" name={item._id}  checked readOnly disabled/>{item.op3}</div>:   <div className={item.ans=="op3"&&'green'} >  <input type='radio' value="op3" name={item._id}  readOnly disabled/>{item.op3}</div>}</div>}
         {item.op4!=undefined &&<div> {ans[item._id]=="op4" ?<div className={ans[item._id]==qns[i].ans?"green":"red"}>  <input type='radio' value="op4" name={item._id}  checked readOnly disabled/>{item.op4}</div>:   <div className={item.ans=="op4"&&'green'} >  <input type='radio' value="op4" name={item._id} readOnly disabled/>{item.op4}</div>}</div>}
        {item.op5!=undefined && <div> {ans[item._id]=="op5" ?<div className={ans[item._id]==qns[i].ans?"green":"red"}>  <input type='radio' value="op5" name={item._id}  checked readOnly disabled/>{item.op5}</div>:   <div className={item.ans=="op5"&&'green'} >  <input type='radio' value="op5" name={item._id}  readOnly disabled/>{item.op5}</div>}</div>}

            </div>
          )
        })
      }

    </div>}
    </div>
  )
}

export default Ass