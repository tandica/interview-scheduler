import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(currentDay, allDays, appointments) {
    //access value of spots - inside day obj
    //calculate spots: total spots - spots taken. spots that are not booked are null.
    //update spots when we book or cancel an interview in those functions
    const currentDayFind = allDays.findIndex((name) => name.name === currentDay);

    const getDay = allDays[currentDayFind];

    console.log('getday', getDay)
    console.log('current day', currentDay)
    console.log('allday', allDays)
    const appointmentForDay = getDay.appointments;

    let spotsAmount = 0;
    for (let id of appointmentForDay) {
      let appointment = appointments[id];
      !appointment.interview && spotsAmount++;
    }

    let updatedSpots = { ...getDay, spotsAmount };
    let updatedDays = [...allDays];
    updatedDays[currentDayFind] = updatedSpots;
    return updatedDays;
  }

  //book interview
  function bookInterview(id, interview) {
    console.log("bookInterview caled", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      
      let newSpots = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days: newSpots });
    });
  }

  //cancel interview
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      let newSpots = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days: newSpots });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  //console.log("state.int", state.interviewers);

  return { state, setDay, bookInterview, cancelInterview };
}
