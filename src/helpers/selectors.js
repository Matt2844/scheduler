// Helper functions used in Application.js

// Gets the appointments for that day ex. function runs and shows all the appointments
// for Monday. 
const getAppointmentsForDay = (state, day) => {

  const dayFound = state.days.find(currentDay => currentDay.name === day);

  if (!dayFound) {
    return [];
  }

  const appointments = dayFound.appointments.map(appointmentId => state.appointments
  [appointmentId]);
  console.log('appointments:', appointments);
  return appointments;

};

// Gets the interviewers for that day. Ex. Interviewers on Monday may be different than Tuesday
const getInterviewersForDay = (state, day) => {

  const dayFound = state.days.find(currentDay => currentDay.name === day);

  if (!dayFound) {
    return [];
  }

  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers
  [interviewerId]);
  console.log('interviewers: ', interviewers);

  return interviewers;
};

// Returns the interview data. 
const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  return (

    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer]
    }
  );
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview }





