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
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((val1, val2) => {
        console.log(val1, val2);
        setState({ ...state, appointments });
      });
  }

  //cancel interview
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then((val1, val2) => {
        console.log(val1, val2);
        setState({ ...state, appointments });
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

  console.log("state.int", state.interviewers);

  return { state, setDay, bookInterview, cancelInterview };
}
