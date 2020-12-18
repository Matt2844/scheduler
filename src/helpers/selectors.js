

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





