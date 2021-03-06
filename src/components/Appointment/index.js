import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"
import useVisualMode from "hooks/useVisualMode.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {

  // setTimeout delay that can be used with promises.
  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // Saving the form data. 
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE, true)
      })

  }

  const cancelInterview = () => {
    transition(CONFIRM)

  }

  // Cancels the interview and sets form to empty. Delay function adjusts the amount of time
  // "Deleting..." appears on the screen for. 
  const cancelInterviewConfirmed = () => {

    transition(DELETE, true);


    props.deleteInterviewData(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE, true);
      })

  };

  // When the user clicks 'close' or 'X' on ERROR_DELETE
  const handleClose = () => {
    transition(EMPTY);
  }


  const editInterview = () => {
    transition(EDIT);
  }

  const interviewers = [];

  return (
    <article className="appointment" data-testid="appointment">
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
          interviewer={props.interview.interviewer}
        />)}
      {mode === ERROR_SAVE && (<Error message={'Error when saving!'} onClose={() => back()} />)}
      {mode === ERROR_DELETE && (<Error message={'Error when deleting!'} onClose={() => handleClose()} />)}

    </article>


  )

}