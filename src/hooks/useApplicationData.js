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

  //update the amount of spots that are available to book
  function updateSpots(currentDay, allDays, appointments) {
    //get index of each day
    const currentDayFind = allDays.findIndex(
      (name) => name.name === currentDay
    );
    
    //set getDay to the index of allDays to get the appointments for each day
    const getDay = allDays[currentDayFind];
    const appointmentForDay = getDay.appointments;

    //loop through each days appointment to get the spots left
    let spotsAmount = 0;
    for (let id of appointmentForDay) {
      let appointment = appointments[id];
      !appointment.interview && spotsAmount++;
    }

    //update with the new values
    let updatedSpots = { ...getDay, spots: spotsAmount };
    let updatedDays = [...allDays];
    updatedDays[currentDayFind] = updatedSpots;
    return updatedDays;
  }

  //book interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      //call function with state variables
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
      //call function with state variables
      let newSpots = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days: newSpots });
    });
  }

  //use useEffect to update the dom as one books, calncels and edits interviews
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
  return { state, setDay, bookInterview, cancelInterview };
}
