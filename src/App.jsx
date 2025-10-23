import React, { useEffect, useState } from 'react'

import {TodoProvider} from './context'
import { Form, TodoItem } from './components'
const App = () => {
  const [todos,setTodos]=useState([])
  const addTodo=(newTodo)=>{
    setTodos((prevTodo)=>[{id:Date.now(),...newTodo},...prevTodo])
    console.log({...newTodo})
  }
  const deleteTodo=(id)=>{
    console.log("Delete id",id);
    setTodos((prev)=>prev.filter((deltodo)=>deltodo.id!=id))
  }
  const updateTodo=(id,todo)=>{
    // console.log(id,todo)
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?todo:prevTodo))
  //  console.log(id,todo)
  }
  const toggleComplete=(id)=>{
    console.log("toggleCompleted id:",id)
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
  }
  
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <Form/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                         
                          {todos.map((item)=>(
                            <div className='w-full' key={item.id}>
                              {console.log(item.id)}
                                <TodoItem todo={item}/>
                            </div>
                          ))}
                    </div>
                </div>
            </div>
  </TodoProvider>)
}

export default App
