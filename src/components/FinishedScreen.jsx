import React from "react";

function FinishedScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = Math.ceil((points * 100) / maxPossiblePoints);
  return (
    <>
    <p className="result">
      You scored <strong>{points}</strong> out of{" "}
      <strong>
        {maxPossiblePoints} (<strong>{percentage} %</strong>)
      </strong>
    </p>
    <p className="highscore">
        (Highscore: {highscore} points)
    </p>
    <button className="btn btn-ui" onClick={() => dispatch({type: 'restartQuiz'})}>Restart Quiz</button>
    </>
  );
}

export default FinishedScreen;
