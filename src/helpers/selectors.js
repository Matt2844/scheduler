

const getAppointmentsForDay = (state, day) => {

  const dayFound = state.days.find(currentDay => currentDay.name === day);

  if (!dayFound) {
    return [];
  }

  const appointments = dayFound.appointments.map(appointmentId => state.appointments
  [appointmentId]);

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
  } else if (interview) {
    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }
  }
};




export { getAppointmentsForDay, getInterviewersForDay, getInterview }
