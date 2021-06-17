export function getAppointmentsForDay(state, day) {
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

export function getInterviewSchedule(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewId = interview.interviewer;
  const interviewer = state.interviewers[`${interviewId}`];
  return { student: interview.student, interviewer };
}
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);
  if (filteredDays) {
    const interviewers = filteredDays.interviewers.map(
      (id) => state.interviewers[id]
    );
    return interviewers;
  } else {
    return [];
  }
}
