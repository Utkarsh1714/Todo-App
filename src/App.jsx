import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => { 
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => { 
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS()
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS()
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS()
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS()
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
        <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 py-1"/>
          <button
            onClick={handleAdd} disabled={todo.length<=1}
            className="bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md"
          >
            Save
          </button>
        </div>

        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished

        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex max-w-96 my-3 justify-between">
                <div className="flex gap-5">
                  <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id=""/>
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2">
                    <FaEdit />
                  </button>
                  <button onClick={(e) => {handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2">
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
              })}
        </div>
      </div>
    </>
  );
}

export default App;
