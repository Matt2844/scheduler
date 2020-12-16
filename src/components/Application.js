import React, { useState, useEffect, useCallback } from "react";

import axios from 'axios';

import "components/Application.js"
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment/index.js"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData.js"



export default function Application (props) {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterviewData
  } = useApplicationData();


  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      < Appointment
        key={appointment.id}
        {...appointment}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterviewData={deleteInterviewData}
      />
    )
  });

  // <Appointment key="last" time="5pm" />

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
            appointments={state.appointments}
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
