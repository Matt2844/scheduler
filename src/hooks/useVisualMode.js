import { useState } from 'react'

// This function keeps track of the mode when a user clicks
// things like "confirm, edit, day, etc..."

// mode may be "SHOW", "CREATE", "DELETE", etc...

// It keeps track of the history so that the user can 
// easily backtrack if they cancel a change for example. 

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  // Similar to .push()
  const transition = (newMode) => {

    setHistory(prev => [...prev, mode])
    setMode(newMode)

  }

  // Similar to .pop()
  const back = () => {

    setMode(history[history.length - 1])
    setHistory(history.slice(0, history.length - 1))

  }
  return { mode, transition, back };
}


