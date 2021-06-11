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

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM ="CONFIRM"

  //create an appt
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }
  
  //delete an appt
  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING);
    props.bookInterview(props.id, interview).then(() => transition(EMPTY));
  }
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Saving message={SAVING} />}
      {mode === DELETING && <Deleting message={DELETING} />}
      {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={back} message={DELETING} />}
    </article>
  );
}
