import { useEffect } from "react";
import { useQuizzes } from "../context/QuizzesContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuizzes();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return <div className="timer">{formatTime(secondsRemaining)}</div>;
}

export default Timer;
