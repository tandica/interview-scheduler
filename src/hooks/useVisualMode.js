import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //take in a new mode and update the mode state with the new value
  const transition = function (newMode, replace = false) {
    if (replace) {
      
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode])
    } else {

      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  };

  //ensure you can transition back to the previous mode
  const back = function () {

    if (history.length <= 1) {
      return;
    }
    setHistory(prev => history.slice(0, prev.length - 1))
    setMode(history[history.length - 2]);
  };

  return { mode, transition, back };
}


// export default function useVisualMode(initialMode) {
//  // const [mode, setMode] = useState(initialMode);
//   const [history, setHistory] = useState([initialMode]); 

//   function transition(newMode, replace = false) {
//     if (!replace) {
//       setHistory(prev => [...prev, newMode]);
//     } else {
//       setHistory(prev => [...prev.slice(0, -1), newMode]);
//     }
//   };
//   function back() {
//     if (history.length === 1) {
//       return
//     }
//     setHistory(prev => [...prev.slice(0, -1)]);
//     //let testt = setHistory(history[history.length - 1])
//     //setHistory(history[history.length - 1]);
//     //let test = history[history.length - 1]a
//   };
//   return { mode: history[history.length - 1], transition, back };
// }
