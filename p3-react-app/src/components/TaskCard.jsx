import React from 'react'
import { Button } from '@mui/material'
import EditTask from './EditTask'
import { Draggable } from 'react-beautiful-dnd'

const TaskCard = ( {task, id, index, taskList, setTaskList} ) => {

    const handleDeleteTask = () => {
        let removeIndex = taskList.indexOf(task);
        taskList.splice(removeIndex, 1);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        window.location.reload();
    }

  return (
    <>
        <Draggable draggableId={`${id}`} index={index}>
            {(provided) => (
                <div 
                    className='flex flex-col items-start
                    jusify-start bg-purple-100 w-full 
                    my-4 py-4 px-6 shadow-md'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className='w-full flex flex-row justify-between'>
                        <p className='font-semibold text-md'>{task.taskName}</p>
                        <EditTask 
                            task={task} 
                            index={index}
                            taskList={taskList}
                            setTaskList={setTaskList}
                        />
                    </div>
                    <p className='text-sm py-2'>{task.taskDescription}</p>
                    <div className='w-full flex justify-center'>
                        <Button
                            variant='contained'
                            className='bg-purple-800 text-purple-100 
                            text-xs font-semibold px-3 py-2 mt-2'
                            onClick={handleDeleteTask}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </Draggable>
    </>
  )
}

export default TaskCard