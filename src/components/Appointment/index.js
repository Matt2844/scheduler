import React, { Fragment, useState } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"
import useVisualMode from "hooks/useVisualMode.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    setTimeout(() => {
      props.bookInterview(props.id, interview)
      transition(SHOW);
    }, 800);
  }

  // const [interview, setInterview] = useState(props.interview || null);


  const cancelInterview = () => {
    transition(CONFIRM)
    console.log('confirm clicked');
  }

  const cancelInterviewConfirmed = () => {
    transition(DELETE);
    setTimeout(() => {
      transition(EMPTY);
    }, 500);
  }

  const editInterview = () => {
    transition(EDIT);
  }

  const interviewers = [];


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancelInterview}
          onEdit={editInterview}
        />
      )}
      {mode === SAVING && (<Status message={'Saving....'} />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onCancel={() => back()}
          onConfirm={cancelInterviewConfirmed}
        />
      )}
      {mode === DELETE && (<Status message={'Deleting....'} />)}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          //These props below includes the info from SHOW. 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />)}

    </article>


  )

}