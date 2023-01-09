import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function CreateWord() {
  const days = useFetch("http://localhost:3001/days");
  const history = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/words/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: dayRef.current.value,
        eng: engRef.current.value,
        kor: korRef.current.value,
        isDone: false,
      }),
    }).then((res) => {
      if (res.OK) {
        alert("생성이 완료 되었습니다.");
        history.push(`/day/${dayRef.current.value}`);
      }
    });
  }

  const engRef = useRef();
  const korRef = useRef();
  const dayRef = useRef();

  return (
    <form onClick={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef}></input>
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef}></input>
      </div>

      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button>저장</button>
    </form>
  );
}

export default CreateWord;
