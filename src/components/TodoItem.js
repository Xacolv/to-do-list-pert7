import React from 'react';

function TodoItem({ todo, toggleTodo, removeTodo }) {
  return (
    <li className="flex justify-between items-center mb-2">
      <span onClick={toggleTodo}>{todo.text}</span>
      <button onClick={removeTodo} className="text-red-500 hover:text-red-700 cursor-pointer">Remove</button>
    </li>
  );
}

export default TodoItem;
