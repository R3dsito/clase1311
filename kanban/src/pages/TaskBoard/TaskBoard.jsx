import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './TaskBoard.scss'

const TaskBoard = () => {
const {id} = useParams()
const [tasks, setTasks] = useState({
  todo: [],
        doing: [],
        blocked: [],
        done: [],
})


  useEffect(() => {
    const fetchTasks = async () => {
    try{
      const response = await axios.get(`http://localhost:3000/tasks/project/${id}`)
      const categorizedTasks = {
        todo: [],
        doing: [],
        blocked: [],
        done: [],
      };

      response.data.forEach(task => {
        if(task.status === 'to do') categorizedTasks.todo.push(task);
        else if(task.status === 'doing') categorizedTasks.doing.push(task);
        else if(task.status === 'blocked') categorizedTasks.blocked.push(task);
        else if(task.status === 'done') categorizedTasks.done.push(task);
      });
      setTasks(categorizedTasks)
    }catch(error){
      console.log(error)
    }
    fetchTasks()
  }}, [])

  const onDragOver = (event) => {
  event.preventDefault()
  }

  const onDragStart = (event, task, sourceColumn) => {
    event.dataTransfer.setData('task', JSON.stringify(task));
    event.dataTransfer.setData('sourceColumn', sourceColumn);
  }

  const onDrop = (e , destinedColumn) => {
    // console.log("drop", e)
    const task = JSON.parse(e.dataTransfer.getData('task'))
    const sourceColumn = e.dataTransfer.getData('sourceColumn')
    console.log(task)
    console.log(sourceColumn)

    if(sourceColumn === destinedColumn) return;

    const sourceTasks = tasks[sourceColumn].filter(t => t._id !== task._id);
    const destindedTasks = [...tasks[destinedColumn], {...tasks, status: destinedColumn}]
    
    setTasks({
      ...tasks,
      [sourceColumn]: sourceTasks,
      [destindedColumn]: destindedTasks
    })


    // try{
    //   await axios.patch(`http://localhost:3000/tasks/${task._id}/status`, {
    //     status: destinedColumn == 'todo' ? 'to do' : destinedColumn
    //   });
      
    // }catch(error){
    //   console.log(error)
    // }

  }

  return (
    <div className='task-board'>
      {['todo', 'doing','blocked', 'done'].map((column) => (
        <div
        key={column}
        className='task-column'
        onDragOver={onDragOver}
        >

        <h2>{column.toUpperCase()} </h2>
        <div>
          {tasks[column].map((tasks) => (
            <div
            className='task-card'
            key={task._id}
            draggable
            onDragStart={(e) => onDragStart(e, task, column)}
            onDrop={(e) => onDrop(e, column)}
            >
              {task.name}
            </div>
          ))}
        </div>
        </div>
      ))}
    </div>
  )
}

export {TaskBoard}