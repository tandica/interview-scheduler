import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function (newMode) {
    setMode(newMode);
  };

  const back = function () {
    if (history.length <= 1) {
      return;
    }
    history.pop();
    setMode(history[history.length - 1]);
    console.log(setMode(history[history.length - 1]));
  };

  return { mode, transition, back };
}
