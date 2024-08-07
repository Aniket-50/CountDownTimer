import { useContext, useState, useRef } from "react";
import "../CSS/AddTimer.css";
import { TimerStore } from "../store/TimerStore";
const AddTimer = () => {
  const { addNewTimer } = useContext(TimerStore);
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [label, setlabel] = useState("");
  const [days,setDays]=useState()
  const [minutes,setMinutes]=useState()
  const [hours,setHours]=useState()
  const dateRef = useRef();
  const labelRef = useRef();
  const timeRef = useRef();
  function HandleChange() {
    setlabel(labelRef.current.value)
    settime(timeRef.current.value);
   setdate(dateRef.current.value);
    let dateArr = date.split("-");
    let time = timeRef.current.value;
    let timeArr = time.split(":");
    let DateObj = new Date();
    let currhours=DateObj.getHours()
    let currYear=DateObj.getFullYear()
    let currMinute=DateObj.getMinutes()
    let currMonth=DateObj.getMonth();
    let currdate = DateObj.toDateString();
    let strDate = currdate.toString();
    strDate = strDate.split(" ");
    let dateYear=dateArr[0];
    let yeardiff=dateYear-currYear
    //console.log(dateArr[1], currMonth+1,dateArr,dateYear,currYear);
    let hoursdiff=timeArr[0]-currhours;
    let minutesDiff=timeArr[1]-currMinute
    let daysDiff=dateArr[2]-strDate[2]
    let monthDiff=dateArr[1]-currMonth-1;
    if(yeardiff<=0 && monthDiff< 0){
      setDays(-1)
     }
     else{
    if(minutesDiff<0){
      minutesDiff=minutesDiff+60;
      hoursdiff=hoursdiff-1
    }
    if(hoursdiff <0 ){
      hoursdiff=hoursdiff+24;
      if(daysDiff>1){
    daysDiff=daysDiff-1;  
    }
    else{
      daysDiff=0;
    }
  }

  if(monthDiff<0){
    monthDiff=monthDiff+12;
   
  }
   while(monthDiff>0 || yeardiff>0){
    if(currMonth+1==8 || currMonth+1==7 || currMonth+1==10 ||currMonth+1==12 ||currMonth+1==1 ||currMonth+1==3 ||currMonth+1==5 ){
      daysDiff=daysDiff+31
      currMonth++;
      if(currMonth==12){
        yeardiff-=1;
        currMonth=1;
      }
    }
    else if(currMonth+1==2){
      currMonth++;
      daysDiff=daysDiff+28;
    }
    else {
      daysDiff+=30
      currMonth++;
    }
    monthDiff--;
   
   }
   
  
setDays(daysDiff)
setHours(hoursdiff)
setMinutes(minutesDiff)
  }
  }
  function handleSubmit(event) {
    event.preventDefault();
    addNewTimer(days,hours,minutes,0,label);
    setdate("");
    settime("");
    setlabel("")
  }

  return (
    <>
    
      <div className="input-container">
        <form action=""  onSubmit={handleSubmit}>
          <input type="date" value={date} onChange={HandleChange} ref={dateRef} required />
          <input type="time"  value={time} onChange={HandleChange} ref={timeRef} required />
          <input type="text" placeholder="Label" value={label} onChange={HandleChange} className="label" ref={labelRef} />

          <button className="add">Add</button>
        </form>
      </div>
    </>
  );
};
export default AddTimer;
