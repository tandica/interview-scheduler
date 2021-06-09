export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);
  console.log("filtereddays", filteredDays);
  console.log("day", day);
  console.log("state.appt", state.appointments)
  if (filteredDays) {
    const appointments = filteredDays.appointments.map(
      (appointment) => state.appointments[appointment]
    );
    console.log("appts", appointments);
    return appointments;
  } else {
    return [];
  }
}

// export function getInterviewSchedule(state, interview) {
//   return interview ? {student: interview.student, interviewer: {...state.interviewers[interview.interviewer]}} : null;
// }
