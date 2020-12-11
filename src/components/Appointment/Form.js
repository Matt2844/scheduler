import React, { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form (props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset () {
    setName('');
    setInterviewer(null);
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
            placeholder="Enter Student Name" />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset} onCancel={props.onCancel} >Cancel</Button>
          <Button confirm onClick={props.onSave} name={props.student} interviewer>Save</Button>
        </section>
      </section>
    </main>
  )
}