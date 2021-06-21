//find appointments for each day
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);
  //if filtered days exists, map it to get the appointments for each day
  if (filteredDays) {
    const appointments = filteredDays.appointments.map(
      (appointment) => state.appointments[appointment]
    );
    return appointments;
  } else {
    return [];
  }
}


export function getInterviewSchedule(state, interview) {
  if (!interview) {
    return null;
  }
  //update the state with the appropriate interview
  const interviewId = interview.interviewer;
  const interviewer = state.interviewers[`${interviewId}`];
  return { student: interview.student, interviewer };
}

//find interviewers for day
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);
  //if filtered days exists, map it to get the interviewers for each day through their id
  if (filteredDays) {
    const interviewers = filteredDays.interviewers.map(
      (id) => state.interviewers[id]
    );
    return interviewers;
  } else {
    return [];
  }
}
