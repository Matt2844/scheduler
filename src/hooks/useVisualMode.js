
import React, { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Similar to .push(). Makes a copy
  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode)
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }

  // Similar to .pop(). All elements minus the last one, while making a copy 
  const back = () => {
    if (history.length >= 1) {
      setMode([...mode.slice(0, mode.length - 1)]);
      setHistory(history.slice(0, -1));
    }
  }
  return { mode, transition, back };
}



// Add an empty back() function to the Hook that allows us to go back to the previous mode. 
// You don't need to implement any logic for this function yet. Be sure to add
// the back property to the object
// that useVisualMode returns, just like you did with the transition() function.

// Create a transition function within useVisualMode that will
// take in a new mode and update the mode state with the new value.

// This custom Hook will need to add the transition property to the object that useVisualMode returns. 
// The property will point to a function that we implement directly in the custom Hook.

// The transition function might be used
//  to transition from the "EMPTY" component 
//  to the "CREATE" component when a user would
//  like to create a new appointment in a
//  currently empty time slot.

