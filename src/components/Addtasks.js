import React, { useEffect, useRef, useState } from "react";
import Listtasks from "./Listtasks";
import './styles.css'

const Addtask = () => {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({title: '', status: false })
    const [isEditing, setIsEditing] = useState(false)
    const [updatedTaskIndex, setUpdatedTaskIndex] = useState(null)
    const inputFocus = useRef()

    const changeTask = (event) => {
        const newTask = {title: event.target.value, status: false}
        setTask(newTask)
    }

    const updateTasks = () => {
        const taskExists = tasks.some(item => item.title === task.title);
        
        if (taskExists) {
            alert('This task is already in the list...');
        
        } else if (tasks.length === 3) {
            alert('Maximum limit')
        }
        
        else if (task.title.trim() !== '') {
            if (isEditing) {
                const updatedTasks = [...tasks];
                updatedTasks[updatedTaskIndex] = { ...updatedTasks[updatedTaskIndex], title: task.title, status: false };
                setTasks(updatedTasks)
                setTask({title: '', status: false });
                setIsEditing(false);
                setUpdatedTaskIndex(null);
            } else {
                setTasks([...tasks, task]);
                setTask({title: '', status: false });
            }
        } else {
            alert('Enter a valid task...');
        }
    }

    const deleteTask = (index) => {
        if (window.confirm('Are you sure?')) {
            const newTasks = [...tasks]
            newTasks.splice(index, 1)
            setTasks(newTasks)  
        }
              
    }

    const editTask = (index) => {
        
        if (!isEditing){
            setIsEditing(true)
            setTask(tasks[index])
            setUpdatedTaskIndex(index)
        }
        else {
            alert('already editing')
        }
    }

    const taskDone = (index) => {
        if (index >= 0 && index < tasks.length) {
            const taskToMark = tasks.find((item, idx) => idx === index);
            taskToMark.status = true
            setTasks([...tasks])
        }
    }

    useEffect(() => {
        inputFocus.current.focus()
    }, [tasks])

    return(
        <div className="addtask-container">
            <div className="input-group mb-5">
                <input type="text" 
                    className="form-control w-50" 
                    placeholder="Ener the tasks..." 
                    aria-describedby="button-addon2"
                    ref={inputFocus}
                    value={task.title}
                    onChange={changeTask}>
                </input>
                <button className="btn btn-outline-primary" type="button" onClick={updateTasks} id="button-addon2">
                    {isEditing ? 'Update' : 'Add'}
                </button>
            </div>

            <Listtasks tasks={tasks} taskDone={taskDone} editTask={editTask} deleteTask={deleteTask} />
        </div>
    )
}

export default Addtask