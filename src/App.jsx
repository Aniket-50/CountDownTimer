import { useReducer } from "react"
import AddTimer from "./Components/AddTimer"
//import "bootstrap/dist/css/bootstrap.min.css"
import TimerList from "./Components/TimerList"
import { TimerStore } from "./store/TimerStore"
import './App.css'
const TimerReducer=(timerList,action)=>{
  let newTimerList=timerList;
  if(action.type=="Add"){
    newTimerList=[...timerList,{id:action.payload.id, days:action.payload.days,hours:action.payload.hours,minutes:action.payload.minutes,seconds:action.payload.seconds, label:action.payload.label}]  
}
else if(action.type=="Delete"){
newTimerList=timerList.filter(item=>item.id!=action.payload.id)

}
return newTimerList;
}
function App() {
const [timerList,DispatchTimerList]=useReducer(TimerReducer,[])
const addNewTimer=(days,hours,minutes,seconds,label)=>{
  const newTimerAction={
    type:"Add",
    payload:{
      id:timerList.length+1,
      days,
      hours,
      minutes,
      seconds,
      label
    }
  };
  DispatchTimerList(newTimerAction); 
}
const DeleteTimer=(id)=>{
  const DelelteTimerAction={
    type:"Delete",
    payload:{
      id
    }
  };
  DispatchTimerList(DelelteTimerAction);
}

  return (
    <>
    <TimerStore.Provider value={{timerList,addNewTimer,DeleteTimer}}>
      <div className="App">
  <AddTimer />
  <TimerList />
  </div>
  </TimerStore.Provider>
    </>
  )
}

export default App
