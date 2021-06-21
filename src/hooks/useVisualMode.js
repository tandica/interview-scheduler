import React, { useState } from "react";

//preventing the use of stale history
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //take in a new mode and update the mode state with the new value
  const transition = function (newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setHistory([...history, newMode]);
    setMode(newMode);
  };

  //ensure you can transition back to the initial mode
  const back = function () {
    if (history.length <= 1) {
      return;
    }
    history.pop(); //not supposed to do?
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
}
