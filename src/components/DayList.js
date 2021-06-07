import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const listOfDays = props.days.map((day) => {
    return (
      <li>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </li>
    );
  });
  return listOfDays;
}
