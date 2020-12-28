import { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.js"
import "components/Application.scss";


export default function useApplicationData (props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const setDay = (day) => setState({ ...state, day });


  // Api requests
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


  // Books interview, stores data in db.
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: interview
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios({
      method: 'put',
      url: `http://localhost:8001/api/appointments/${id}`,
      data: { interview }
    })
      .then((response) => {
        const newDays = calculateDaySpots(state.days, appointments);
        setState({ ...state, appointments, days: newDays });
      })
      .catch((error) => {
        console.log(error);
      });

  };


  // Clears the relevant appointment data from the db. 
  const deleteInterviewData = (id) => {
    // const id = props.id
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        window.location.reload(false)
      })
      .catch((error) => {
        console.log(error);
      });

  }

  // Returns days with the proper spots
  const calculateDaySpots = (days, appointments) => {
    return days.map(day => {
      const newSpots = day.appointments.filter(appointment => appointments[appointment].interview === null);
      const newDay = { ...day, spots: newSpots.length };
      return newDay;
    })
  }
  return { state, setDay, bookInterview, deleteInterviewData }

};
