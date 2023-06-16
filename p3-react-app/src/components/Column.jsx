import React from 'react'
import './scroll.css'
import { useState, useEffect } from 'react'
import NewTask from './NewTask';
import TaskCard from './TaskCard';
import { StrictModeDroppable as Droppable} from '../helpers/StrictModeDroppable';

const Column = ({ title, tasks, id}) => {
    const [taskList, setTaskList] = useState([]);
  
    useEffect(() => {
      let array = localStorage.getItem('taskList')
  
      if (array) {
        setTaskList(JSON.parse(array))
      }
    }, [])
  
    return (
        <div className='max-w-xs w-[30%]'>
          <div className='flex flex-row max-w-sm px-6 py-1 bg-purple-800
            justify-between'>
              <h2 className='text-xl font-semibold text-purple-100'>
                {title}
              </h2>
              <NewTask taskList={taskList} setTaskList={setTaskList} />
          </div>
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                className='border overflow-y-auto max-h-[35rem] column'
                ref={provided.innerRef}
                {...provided.droppableProps}

              >
                {taskList.map((task, index) => 
                  <TaskCard
                    key={index}
                    id={index + 1}
                    task={task}
                    index={index}
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
    )

}
  


export default Column
