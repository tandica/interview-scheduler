import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const listOfInterviewers = props.interviewers.map((interviewer) => {
    return (
      <ul key={interviewer.id}>
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewer={props.setInterviewer}
        />
      </ul>
    );
  });
  return listOfInterviewers;
}

// <section className="interviewers">
//   <h4 className="interviewers__header text--light">Interviewer</h4>
//   <ul className="interviewers__list"></ul>
// </section>;
