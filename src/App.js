
import './App.css';
import {useContext, useReducer, useEffect} from "react";
import {TodoProvider} from "./TodoContext/Context.js";
import axios from "axios";

const initState = {
  loading : false,
  data : [],
  error : false
}
const reducer = (state = initState, {type, payload}) => {
  switch(type) {
    case "ADD_TODO_LOADING" :
      return {
        ...state,
        loading : true
      }
    case "ADD_TODO_SUCCESS" : 
      return {
        ...state,
        loading : false,
        data : [...state.data, payload]
      }
    case "ADD_TODO_ERROR" : 
      return {
        ...state,
        loading : false,
        error : payload
      }
    case "GET_TODO_LOADING" :
        return {
          ...state,
          loading : true
        }
     case "GET_TODO_SUCCESS" : 
        return {
          ...state,
          loading : false,
          data : payload
        }
    case "GET_TODO_ERROR" : 
        return {
          ...state,
          loading : false,
          error : payload
        }
    default :
      return {
        ...state
      }
  }
}



function App() {

const {text, handleText, todo, handleTodo} = useContext(TodoProvider)
const [state, dispatch] = useReducer(reducer, initState);

const getData = async () => { 
  dispatch({type : "GET_TODO_LOADING"});
  try { 
    let {data} = await axios.get("http://localhost:3001/todos");
    dispatch({type : "GET_TODO_SUCCESS", payload : data});
  } catch(error){
    dispatch({type : "GET_TODO_ERROR"})
  }
  
  

}
useEffect(() => {
getData();
}, [])

// console.log(todo);

  return (
    <div className="App">
      <div>
        <input onChange = {(e) => { 
          handleText(e.target.value)
        }} value = {text} type = "text" name = "todo" placeholder = "Enter the task" />
        <button onClick = {async () => {
          dispatch({type : "ADD_TODO_LOADING"})
          try {
            const payload = {
              title : text,
              status : false
            }
            const {data} = await axios.post("http://localhost:3001/todos", payload);
            dispatch({type : "ADD_TODO_SUCCESS", payload : data})
            handleTodo(data);
            getData();
          } catch(error) {
            dispatch({type : "ADD_TODO_ERROR", payload : error})
          }
        }}>ADD</button>
      </div>
      <hr />
     
        {state.loading? (<div>....Loading</div>) : state.error ? (<div>{state.error}</div>) :

          ( <div>
              {
                state.data.map((e) => (
                  <div key = {e.id}>
                    {e.title}
                  </div>
                ))
              }
            </div>)
        }
    </div>
  );
}

export default App;
