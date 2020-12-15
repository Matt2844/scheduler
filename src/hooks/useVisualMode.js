
import React, { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Similar to .push()
  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode)
    } else {
      setHistory([...history, mode]);
      setMode(mode);
    }
  }

  // Similar to .pop()
  const back = () => {
    if (history.length >= 1) {
      setMode(...history.slice(0, history.length - 1));
      setHistory(history.slice(0, history.length - 1));
    }
  }
  return { mode, transition, back };
}


