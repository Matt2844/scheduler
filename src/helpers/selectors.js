

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

function getAppointmentsForDay (state, day) {

  const theDayAppointments = [];
  const dayMatches = [];
  let appKeys = Object.keys(state.appointments);

  const mapFirst = state.days.map((theDay) => {
    if (theDay.name === day) {
      theDay.appointments.map((appointment) => {
        theDayAppointments.push(appointment);
      })
    }
  })
  for (let app of appKeys) {
    theDayAppointments.map((day) => {
      if (app == day) {
        dayMatches.push(day);
      }
    })
  }
  dayMatches.map((match) => {
    console.log(state.appointments[match])
    return state.appointments[match]
  })
}


getAppointmentsForDay(state, "Monday")
