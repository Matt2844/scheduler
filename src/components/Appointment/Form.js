import React, { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form (props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset () {
    setName('');
    setInterviewer(null);
  }

  function validate () {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onSubmit={(event) => event.preventDefault()}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset} onClick={props.onCancel} >Cancel</Button>
          <Button confirm onClick={(() => props.onSave(name, interviewer))} onClick={validate} name={props.student} interviewer>Save</Button>
        </section>
      </section>
    </main>
  )
}