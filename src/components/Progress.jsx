import { useQuizzes } from "../context/QuizzesContext";

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuizzes();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        You scored <strong>{points}</strong> of {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
