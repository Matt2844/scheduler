
// import React, { useState, useEffect, useCallback } from "react";

// import axios from 'axios';

// import "components/Application.js"
// import "components/Application.scss";

// import Appointment from "components/Appointment/index.js"
// import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";



// const [state, setState] = useState({
//   day: "Monday",
//   days: [],
//   appointments: {}
// });


// const setDay = (day) => setState({ ...state, day });


// // Api requests
// useEffect(() => {
//   Promise.all([
//     axios.get('http://localhost:8001/api/days'),
//     axios.get('http://localhost:8001/api/appointments'),
//     axios.get('http://localhost:8001/api/interviewers')
//   ])
//     .then((all) => {
//       console.log('API all: ', all)
//       setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }, []);


// // Books interview, stores data in db.
// const bookInterview = (id, interview) => {
//   const appointment = {
//     ...state.appointments[id],
//     interview: interview
//   }
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   setState({ ...state, appointments });

//   axios({
//     method: 'put',
//     url: `http://localhost:8001/api/appointments/${id}`,
//     data: { interview }
//   })
//     .then((response) => {
//       console.log('res:', response);
//       const newDays = calculateDaySpots(state.days, appointments);
//       setState({ ...state, appointments, days: newDays });
//     })
//     .catch((error) => {
//       console.log(error);
//     });

// };


// // Clears the relevant appointment data from the db. 
// const deleteInterviewData = (id) => {
//   // const id = props.id
//   axios.delete(`http://localhost:8001/api/appointments/${id}`)
//     .then((response) => {
//       console.log('res:', response)
//     })
//     .catch((error) => {
//       console.log(error);
//     });

// }

// // Returns days with the proper spots
// const calculateDaySpots = (days, appointments) => {
//   return days.map(day => {
//     const newSpots = day.appointments.filter(appointment => appointments[appointment].interview === null);
//     const newDay = { ...day, spots: newSpots.length };
//     return newDay;
//   })
// };

// export default { state, setDay, bookInterview, deleteInterviewData }