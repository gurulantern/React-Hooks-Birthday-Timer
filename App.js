import React, { useEffect, useState } from "react";
import "./App.css";

//Functions
const dateMaker = (b) => {
  const date = new Date().getFullYear() + "-" + b;
  return new Date(date).getTime();
}

const yearIncrement = (b) => {
  const date = (new Date().getFullYear() + 1) + "-" + b;
  return new Date(date).getTime();
}

//App
function App() {
  const [birthday, setBirthday] = useState('10-11');

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(birthday)
  }

  const handleChange = (e) => {
    setBirthday(e.target.value)
  }

  const calculateTime = () => {
    var difference;
    if (dateMaker(birthday) < new Date().getTime()) {
      difference = yearIncrement(birthday) - new Date().getTime();

    } else {
      difference = dateMaker(birthday) - new Date().getTime();

    };
    let timeLeft = {};

    if (difference < 31449600000) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTime());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div className="App">
      <h1 className="title">Birthday Countdown</h1>
      <div className="form">
        <label for="date">When is your birthday?  </label>
        <input
          id="date"
          className="date-input"
          placeholder="MM/DD"
          required pattern="\d{2}-\d{2}"
          onChange={handleChange}
          value={birthday}>
        </input>
      </div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg" bg3></div>
      <div className="timer">
          {timerComponents.length ? timerComponents : <span className="Birthday">Happy Birthday!!</span>}
      </div>
    </div>
  );
}

export default App;
