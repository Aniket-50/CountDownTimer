import { useContext } from "react"
import {TimerStore} from '../store/TimerStore'
import Timer from '../Components/Timer'
const TimerList =()=>{
const {timerList}=useContext(TimerStore);
  return (
    <>
     <div className="container">
    {timerList.map(item=> 
      <Timer key={item.id} id={item.id} days={item.days}
      hours={item.hours} minutes={item.minutes} seconds={item.seconds} label={item.label} />
    )}
</div>
    </>
  )
}
export default TimerList;