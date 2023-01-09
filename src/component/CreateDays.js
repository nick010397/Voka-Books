import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function CreateDays() {
  const days = useFetch("http://localhost:3001/days");
  const history = useNavigate();
  function addDay() {
    fetch(`http://localhost:3001/days/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: days.length + 1,
      }),
    }).then((res) => {
      if (res.OK) {
        alert("생성이 완료 되었습니다.");
        history.push("/");
      }
    });
  }
  return (
    <div>
      <h3>현재일수 : {days.length}일</h3>
      <button onClick={addDay}>Day 추가</button>
    </div>
  );
}

export default CreateDays;
