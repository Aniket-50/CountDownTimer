import { useContext, useEffect, useState } from "react"
import { TimerStore } from "../store/TimerStore";
import '../CSS/Timer.css'
import { Alert } from "bootstrap";
const Timer =({id,days,hours,minutes,seconds,label})=>{
  const [IsStart ,setIsStart]=useState(true)
  const [Timerdays,setdays]=useState(days);
  const [Timerhours,sethours]=useState(hours);
  const [Timerminutes,setminutes]=useState(minutes);
  const [Timerseconds,setseconds]=useState(seconds);
  const [timerID,setTimerID]=useState(0)
 function HandleStart(){
  setIsStart(!IsStart)
 }
 const RunTimer=(Timerdays,Timerhours,Timerminutes,Timerseconds)=>{
  if(Timerseconds>0){
    setseconds((s)=>s-1)
  }
  else if(Timerseconds==0 && Timerminutes>0){
    setminutes((m)=>m-1)
    setseconds(59)
  }
  else if(Timerseconds==0 && Timerminutes==0 && Timerhours>0){
    sethours((h)=>h-1)
    setseconds(59)
    setminutes(59)
  }
  else if(Timerdays>0 && Timerhours==0 && Timerminutes==0 &&Timerseconds==0){
    setdays((D)=>D-1)
    setseconds(59)
    setminutes(59)
    sethours(23)
  }
  else {
console.log("timer finished")
   alert("finished")
   setIsStart(false)
  }
 }
 useEffect(()=>{
let interval;
if(IsStart && Timerdays>=0){
interval=setInterval(() => {
  RunTimer(Timerdays,Timerhours,Timerminutes,Timerseconds)
 // console.log(Timerdays,Timerhours,Timerminutes,Timerseconds)
}, 1000);
}
else if(Timerdays<0) {
  alert("invalid input")
  DeleteTimer(id)
}

setTimerID(interval)
return ()=>{
  clearInterval(interval)
}
 },[IsStart,Timerdays,Timerhours,Timerminutes,Timerseconds])
  const {DeleteTimer}=useContext(TimerStore)
  return( <>
  <div className="timer-container">
    <div className="time">
      <span className="counter">{Timerdays}{"D"}</span>
      <span  className="counter">{Timerhours}{"H"}</span>
      <span  className="counter">{Timerminutes}{"M"}</span>
      <span className="counter"> {Timerseconds}{"S"}</span>
    <div className="TimerLabel">{label}</div>
    </div>
    <div className="bttn"></div>
    <button className="pause btn" onClick={HandleStart}>{IsStart?"Pause":"Resume"}</button>
    <button className="del btn" onClick={()=>DeleteTimer(id)}>Delete</button>
  </div>
  
  </>)
}
export default Timer;