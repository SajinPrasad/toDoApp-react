import React from 'react'
import './styles.css'

const Listtasks = ({tasks, editTask, deleteTask, taskDone}) => {
    return (
        <>
        {
            tasks.map((task, index) => {
                const taskClasses = task.status ? "task-container task-complete":"task-container task-not-complete"
                return(
                <div key={task.title} className={taskClasses}>
                    <h5 className='task-title mt-2'>{index + 1}: {task.title}</h5>
                    <label onClick={() => {taskDone(index)}} className={task.status ? 'text-success task-done-label mt-2':'text-white task-done-label mt-2'}>{task.status ? 'Done':'Mark as done'}</label>
                    <button className='btn-outline-danger rounded border-0' 
                    onClick={() => {deleteTask(index)}} >Delete</button>
                    <button className='btn-outline-warning rounded border-0' 
                    onClick={() => {editTask(index)}} >Edit</button>
                </div>
            )
            })
        }
        </>
    )
}

export default Listtasks
