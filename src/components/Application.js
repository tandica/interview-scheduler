import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewSchedule,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  console.log("application state", state);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  //console.log("appt days", dailyAppointments);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterviewSchedule(state, appointment.interview);
    console.log("state interview", interview);

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

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const setDay = (day) => setState({ ...state, day });

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
