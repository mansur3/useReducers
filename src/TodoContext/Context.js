import {createContext, useState, useEffect} from "react";


export const TodoProvider = createContext();

export const AppTodoProvider = ({children}) => {

const [text, setText] = useState("");
const [todo, setTodo] = useState([])
const handleText = (e) => {
    setText(e);
}
const handleTodo = (e) => {
    setTodo([...todo, e])
}


return (
    <TodoProvider.Provider value = {{text, handleText, todo, handleTodo}} >

        {children}
    </TodoProvider.Provider>
)

    
}