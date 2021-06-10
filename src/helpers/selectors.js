export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);
  // console.log("filtereddays", filteredDays);
  // console.log("day", day);
  // console.log("state.appt", state.appointments);
  if (filteredDays) {
    const appointments = filteredDays.appointments.map(
      (appointment) => state.appointments[appointment]
    );
    // console.log("appts", appointments);
    return appointments;
  } else {
    return [];
  }
}

export function getInterviewSchedule(state, interview) {
  //console.log("state", state);
  if (!interview) {
    return null;
  }
  const interviewId = interview.interviewer;
  const interviewer = state.interviewers[`${interviewId}`];
  // console.log("state int", state.interviewers);
  // console.log("state int with id", state.interviewers[interviewId]);
  // console.log("state int with id", state.interviewers[`${interviewId}`]);
  return { student: interview.student, interviewer };
}
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);
  if (filteredDays) {
    const appointments = filteredDays.appointments.map(
      (appointment) => state.appointments[appointment]
    );
    return appointments;
  } else {
    return [];
  }
}
