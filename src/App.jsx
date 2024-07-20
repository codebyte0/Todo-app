import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showfinished, setshowfinished] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowfinished(!showfinished);
  };

  const handleAdd = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      savetols();
    }
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetols();
  };

  const handleDelete = (e, id) => {
    const confirmed = window.confirm('Are you sure you want to delete this Todo?');
    if (confirmed) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      savetols();
      console.log('Todo deleted');
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetols();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const toggleSorting = () => {
    setSortAscending(!sortAscending);
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh] md:w-[80%]">
        <h1 className='font-bold text-3xl text-center'>UTasks - Manage your Todos</h1>
        <div className="add-todo my-5">
          <h2 className="text-lg font-bold m-2 ">Add a todo</h2>
          <input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={todo}
            className='w-full rounded-full px-5 py-2'
            type="text"
          />
          <div className="w-full flex justify-center">
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className=' disabled:bg-violet-400 py-1 my-3 w-1/2 font-bold cursor-pointer hover:bg-blue-600 bg-blue-500 p-3 rounded-md text-white'
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex justify-between md:w-1/2">
          <div className="input-part">
            <input
              type="checkbox"
              onChange={toggleFinished}
              className='mr-2'
              checked={showfinished}
            />
            Show All
          </div>
          <button className='py-1 font-bold hover:bg-sky-600 bg-sky-500 p-3 rounded-md mx-0 text-white cursor-pointer translate-x-5 translate-y-1' onClick={toggleSorting}>Toggle Sorting</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-bold text-2xl underline'>No Todos to display</div>}
          {todos
            .filter(item => showfinished || !item.isCompleted)
            .sort((a, b) => sortAscending ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id))
            .map(item => (
              <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
                <div className="flex gap-5 items-center justify-center">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    id=""
                    checked={item.isCompleted}
                  />
                  <div className={`todo-item ${item.isCompleted ? "line-through" : ""} max-w-[300px] h-auto flex flex-wrap break-all`}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => { handleEdit(e, item.id) }}
                    className='py-1 font-bold hover:bg-blue-600 bg-blue-500 p-3 rounded-md mx-1 text-white cursor-pointer'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => { handleDelete(e, item.id) }}
                    className='py-1 font-bold hover:bg-blue-600 bg-blue-500 p-3 rounded-md mx-1 text-white cursor-pointer'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default App;
