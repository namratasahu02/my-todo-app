import { useEffect, useState } from "react";
import "./App.css"
import Item from "./item";
function App() {
  const [newTask, setNewTask] = useState('')

  const [todoTask, setTodoTask] = useState(() => {
    const savedTodos = localStorage.getItem("todoItem");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  })
  const [incompleteTask, setIncompleteTask] = useState([])
  const [completeTask, setCompleteTask] = useState([])
  const addTask = () => {
    const addedTask = {
      id: todoTask?.length,
      name: newTask,
      createdAt: new Date(),
      completed: false
    }
    setTodoTask([...todoTask, addedTask])
    setNewTask('')
    localStorage.setItem("todoItem", JSON.stringify([...todoTask, addedTask]))
  }
  const editValue = (id, value,key) => {
    const updatedList = todoTask?.map((item) => {
      if (item.id === id) {
        const update = item
        update[key] = value
        return ({...update})
      } else {
        return ({ ...item })
      }
    })
    setTodoTask(updatedList)
    localStorage.setItem("todoItem", JSON.stringify(updatedList))
  }
  const clearCompletedTask = () => {
    const incompletedTask = todoTask.filter(item => !item?.completed)
    setCompleteTask([])
    setTodoTask(incompletedTask)
    localStorage.setItem("todoItem", JSON.stringify(incompletedTask))
  }
  useEffect(() => {
    const completed = []
    const incompleted = []
    todoTask?.forEach((item) => {
      if (item?.completed) {
        completed.push(item)
      } else {
        incompleted.push(item)
      }
    })
    setIncompleteTask(incompleted)
    setCompleteTask(completed)
  }, [todoTask])

  return (
    <>
      <div className="container">
        <h2>TODO LIST</h2>
        <h3>Add Item</h3>
        <p>
          <input name="newTask" value={newTask} onChange={(e) => setNewTask(e.target.value)} type="text" /><button onClick={() => addTask()}>Add</button>
        </p>
        <div>
          <div className="heading">
            <h3>Todo</h3>
          </div>
          <ul id="incomplete-tasks">
            {incompleteTask?.length > 0 ? incompleteTask?.map((item, index) => <Item key={index} item={item} editValue={editValue} />) : <li className="noData">No item on list</li>}
          </ul>
        </div>
        <div>
          <div className="heading">
            <h3>Completed</h3>
            <button onClick={() => clearCompletedTask()}>Clear All</button>
          </div>
          <ul id="completed-tasks">
            {completeTask?.length > 0 ? completeTask?.map((item, index) => <Item key={index} item={item} editValue={editValue} defaultChecked={true} />) : <li className="noData">No item on list</li>}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
