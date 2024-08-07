import { createContext } from "react";

 export const TimerStore=createContext({

  timerList:[],
  addNewTimer:()=>{},
  DeleteTimer:()=>{}
});