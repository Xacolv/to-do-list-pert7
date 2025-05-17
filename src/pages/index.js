import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <form onSubmit={addTodo} className="flex gap-2 mt-2">
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Add a new task" 
        className="border p-2 rounded w-64"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Add</button>
    </form>
      <ul className="mt-4 w-64">
        {todos.map((todo, index) => (
          <TodoItem 
            key={index} 
            todo={todo} 
            toggleTodo={() => toggleTodo(index)} 
            removeTodo={() => removeTodo(index)} 
          />
        ))}
      </ul>
    </div>
  );
}
