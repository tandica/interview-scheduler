export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((item) => item.name === day);
  console.log("filtereddays", filteredDays);
  console.log("day", day);
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
