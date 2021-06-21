import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import { bookInterview } from "../Application";
import Saving from "./Saving";
import Deleting from "./Deleting";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //create an appt
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log("error", error);
      });
  }

  //delete an appt
  function cancelInterview(interview) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // function deleteInterview () {
  //   transition(DELETING, true);
  // }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={
            props.interview.student
              ? props.interview.student
              : "Edit to insert your name"
          }
          interviewer={
            props.interview.interviewer
              ? props.interview.interviewer.name
              : "Edit to choose an interviewer"
          }
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Saving message={SAVING} />}
      {mode === DELETING && <Deleting message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => cancelInterview(props.interview)}
          onCancel={back}
          message={"Are you sure you want to delete?"}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id} //took out .id from here 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Cannot save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Cannot delete appointment" onClose={back} />
      )}
    </article>
  );
}
