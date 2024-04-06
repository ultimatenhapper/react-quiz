import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";


const initialState = {
  questions: [],
  //loading, error, ready, active, finished 
  status: 'loading',
  index: 0,
  answer: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state, status: "error"}
    case 'newAnswer':
      return {...state, answer: action.payload}
    case 'startQuiz':
      return {...state, status: 'active'}
    default: 
      throw new Error('Action unknown')
  }
}
function App() {
  const [{answer, index, questions, status}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const handleStart = () => {
    dispatch({type: 'startQuiz'});
  }

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({type: 'dataReceived', payload: data}))
      .catch((err) => dispatch({type: 'dataFailed'}));
  }, []);

  
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} onClickStart={handleStart}/>}
        {status === 'active' && <Question question={questions[index]} dispatch={dispatch} answer={answer}/>}
      </Main>
    </div>
  );
}

export default App;
