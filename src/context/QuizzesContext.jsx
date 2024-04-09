import { createContext, useContext, useReducer } from "react";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        status: "active",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

const QuizzesContext = createContext();

function QuizzesProvider({ children }) {
  const [
    { answer, index, questions, points, status, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const question = questions[index]

  return (
    <QuizzesContext.Provider
      value={{
        answer,
        highscore,
        index,
        numQuestions,
        maxPossiblePoints,
        points,
        question,
        questions,
        secondsRemaining,
        status,
        dispatch
      }}
    >
      {children}
    </QuizzesContext.Provider>
  );
}

const useQuizzes = () => {
  const context = useContext(QuizzesContext);
  if (!context)
    throw new Error("Using QuizzesContext outside of QuizzesProvider");

  return context;
};

export { QuizzesProvider, useQuizzes };
