import React, { useState } from "react";
import { useTodo } from "../context/todoContext";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [newMsg, setNewMsg] = useState(todo.todo);
  const { deleteTodo, updateTodo, toggleComplete } = useTodo();
console.log("todo id",todo.id)
console.log(todo.todo)
  const editTodo = () => {
    console.log(todo)
    updateTodo(todo.id, { ...todo, todo: newMsg });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    console.log(todo.id);
    
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`flex text-black border  w-full border-black/10  rounded-lg px-3 py-1.5 gap-x-3 shadow-white/50 duration-150 ${
        todo.completed ? "bg-green-600" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`outline-none bg-transparent w-full rounded-lg ${
          isTodoEditable ? "bg-black/10 px-2 border border-black/20" : "bg-transparent "
        } ${todo.completed ? "line-through" : ""}`}
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border-black/20 items-center justify-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 "
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
          
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border-black/20 items-center justify-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 "
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
