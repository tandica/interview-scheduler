import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  
  const transition = function(newMode) {

    setMode(newMode)
  }
  return { mode, transition };
}
