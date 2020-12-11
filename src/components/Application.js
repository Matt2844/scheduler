import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.js"
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment/index.js"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";


export default function Application (props) {

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
        console.log('API all: ', all)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => (
    < Appointment
      key={appointment.id}
      {...appointment}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
    />
  ));

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointments}</section>
    </main>
  );
}
