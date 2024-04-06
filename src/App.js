import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";

const initialState = {
  questions: [],
  //loading, error, ready, active, finished 
  status: 'loading'
}
const reducer = (state, action) => {
  switch(action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state, status: "error"}
    default: 
      throw new Error('Action unknown')
  }
}
function App() {
  const [{questions, status}, dispatch] = useReducer(reducer, initialState);

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
      </Main>
    </div>
  );
}

export default App;
