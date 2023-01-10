import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

export interface IDay {
  id: number;
  day: number;
}

function DayList() {
  const days: IDay[] = useFetch("http://localhost:3001/days");
  const [day, setDay] = useState([]);

  if (days.length === 0) {
    return <span>Loading...</span>;
  }
  function del() {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch(`http://localhost:3001/days/${day.id}`, {
        method: "Delete",
      }).then((res) => {
        if (res.ok) {
          setDay({ id: 0 });
        }
      });
    }
  }
  if (day.id === 0) {
    return null;
  }

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
          <StyledButton onClick={del}>X</StyledButton>
        </li>
      ))}
    </ul>
  );
}
const StyledButton = styled.button`
  position: absolute;
  top: 100px;
`;

export default DayList;
