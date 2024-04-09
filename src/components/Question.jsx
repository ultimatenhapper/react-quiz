import { useQuizzes } from "../context/QuizzesContext";
import Options from "./Options";

function Question() {
  const { question, dispatch, answer } = useQuizzes();
  
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
