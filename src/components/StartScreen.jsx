import React from "react";
import { useQuizzes } from "../context/QuizzesContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuizzes();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let´s Start
      </button>
    </div>
  );
}

export default StartScreen;
