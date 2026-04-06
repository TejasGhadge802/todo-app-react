import React, { useState, useEffect } from "react";
import TodoCss from "./Todo.module.css";
import toast from "react-hot-toast";

const Todo = () => {
  
  const taskList = JSON.parse(localStorage.getItem("todo_task")) || [];
  
  const [allTasks, setAllTasks] = useState(taskList);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [comTask, setComTaak] = useState(0);
  const [remTask, setRemTaak] = useState(0);
  
  
  
  const handleForm = (e) => {
    e.preventDefault();
    
    if(!task.trim()){
      toast.error("Please Enter Task...");
    }else{
      const isSame = allTasks.some((val, idx)=>{
        return val.task.toLowerCase() === task.toLowerCase();
      })
      
      if(isSame){
        toast.error("Task Already Added.");
        setTask("");
      }else{
        setAllTasks([...allTasks, {task: task, isComplete: false}]);
        toast.success("Task Added Sucessfully.");
        setTask("");
      }
    }
  }
  
  const deleteTask = (id) => {
    const copyAllTasks = [...allTasks];
    
    const idToDelete = copyAllTasks.filter((val, idx)=>{
      return idx !== id
    })
    
    if(idToDelete){
      const confirm = window.confirm("Are U Want To Delete This Task?");
      
      if(confirm){
        setAllTasks(idToDelete);
      }else{
        setAllTasks(copyAllTasks);
      }
    }
  }
  
  const changeCheckbox = (id) => {
    const copyAllTasks = [...allTasks];
    
    copyAllTasks[id].isComplete = !copyAllTasks[id].isComplete
    setAllTasks(copyAllTasks)
  }
  
  const updateTask = (id) => {
    const copyAllTasks = [...allTasks];
    
    const oldTask = copyAllTasks[id].task;
    const newTask = prompt(`Update Task: ${oldTask}`, oldTask)
    
    if(newTask === null){
      return
    }else if(newTask.trim().toLowerCase() === oldTask.trim().toLowerCase()){
    }
    
    const newTaskObj = {task: newTask.trim(), isComplete: false};
    copyAllTasks.splice(id, 1, newTaskObj);
    
    setAllTasks(copyAllTasks);
  }
  
  const searchResult = allTasks.filter((item, idx)=>{
    return item.task.toLowerCase().includes(search.toLowerCase());
  })
  
  useEffect(()=>{
    const copyAllTasks = [...allTasks];
    
    const completedTask = copyAllTasks.filter((val)=>{
      return val.isComplete;
    })
    setComTaak(completedTask.length)
    
    const remainingTask = copyAllTasks.filter((val)=>{
      return !val.isComplete;
    })
    setRemTaak(remainingTask.length)
    
    localStorage.setItem("todo_task", JSON.stringify(copyAllTasks))
  }, [allTasks])
  
  
  
  return(
    <div className={TodoCss.main}>
      <div>
        <h1>To-Do App</h1>
        
        <div className={TodoCss.taskContainer}>
          <form onSubmit={handleForm}>
            <input type="text" className="form-control" placeholder="Add Task..."
              value={task}
              onChange={(e)=>{setTask(e.target.value)}}
            />
            <button type="submit" className="form-control mt-3 btn btn-warning">Add Task</button>
            
            <input type="text" className="form-control mt-3" placeholder="Search Task..."
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
            />
          </form>
        </div>
        
        <div className={`mt-4 p-2 ${TodoCss.displayTask}`}>
          { 
            searchResult.length === 0 ? <p style={{
              textAlign: "center",
              fontWeight: "bold",
              paddingTop: "5px",
            }}>Add Task</p>: 
            searchResult.map((item, idx)=>(
              <div className={`py-2 ${TodoCss.tasks}`}>
                <input className={`mx-1`} type="checkbox" checked={item.isComplete}
                  onChange={()=>{changeCheckbox(idx)}}
                />
                <span
                  style={{
                    textDecoration:item.isComplete ? "line-through" : "",
                    margin: "0 5px 0 5px",
                  }}
                >{item.task}</span>
                <i class="bi bi-trash3 text-danger float-end mx-3"
                  onClick={()=>{deleteTask(idx)}}
                ></i>
                <i class="bi bi-pencil text-warning float-end mx-3"
                  onClick={()=>{updateTask(idx)}}
                ></i>
              </div>
            ))
          }
        </div>
        
        <span className={`fw-bold m-2 d-block text-center`}
        >Complete Task: {comTask}</span>
        <span className={`fw-bold m-2 d-block text-center`}>Remaining Task: {remTask}</span>
      </div>
    </div>
  )
}

export default Todo;