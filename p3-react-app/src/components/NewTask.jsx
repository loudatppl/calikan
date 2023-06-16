import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material'


const NewTask = ({ taskList, setTaskList}) => {
    const [addModal, setAddModal] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInput = (e) => {
        const {name, value} = e.target;

        if (name === 'taskName') {
            setTaskName(value);
            setErrorMessage('');
        }
        if (name ==- 'taskName' && value === '') {
            setErrorMessage('Please enter a task name');
        }
        if (name === 'taskDescription') setTaskDescription(value);
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!taskName) {
            setErrorMessage('Please enter a task name');
        } else {
            let tempList = taskList;
            tempList.push({
                taskName,
                taskDescription,
            })

            localStorage.setItem('taskList', JSON.stringify(tempList))
            window.location.reload()
            setAddModal(false);
            setTaskName('');
            setTaskDescription('');
        }
    }

  return (
    <>
        <Button
            variant='contained'
            className='bg-purple-100 text-purple-800 
            text-xs font-semibold px-3 py-1'
            onClick={() => setAddModal(true)}
        >
            Add Card
        </Button>
        {addModal ? (
            <>
                <div className='flex overflow-x-hidden overflow-y-auto fixed
                inset-0 z-99 items-center justify-center mt-12'>
                    <div className='flex flex-col relative w-9/12 
                    bg-purple-100 rounded-lg shadow-md max-w-xs'>
                        <div className='flex flex-row justify-between pl-4 py-4
                            border-b border-purple-50 rounded-t'>
                            <h2 className='text-xl font-bold uppercase'>New Task</h2>
                            <Button
                                variant='text'
                                className='text-purple-800 
                                text-xs font-semibold float-right block'
                                onClick={() => setAddModal(false)}
                            >
                                x
                            </Button>
                        </div>
                        <form className='px-6 pt-6 pb-4'>
                            <div>
                            <label 
                                className=' tracking-wide uppercase
                                text-gray-700 text-xs font-semibold mb-2
                                block'
                                htmlFor="task-name">
                                Task Name
                            </label>
                            <input 
                                className='w-full bg-purple-50 
                                text-gray-700 border border-purple-200
                                rounded py-3 px-4 mb-5 leading-tight 
                                focus:outline-none focus:bg-white text-md'
                                id='task-name'
                                type="text" 
                                name='taskName'
                                value={taskName}
                                placeholder='Task name'
                                onChange={handleInput}
                                required
                            />
                            <p className='text-red-500 text-center
                                text-sm mt-1 mb-5'>
                                {errorMessage}
                            </p>
                            </div>
                            <div>
                                <label 
                                    className=' tracking-wide uppercase
                                    text-gray-700 text-xs font-semibold mb-2
                                    block'
                                    htmlFor="task-description"
                                >
                                    Task description
                                </label>
                                <textarea 
                                    className='w-full bg-purple-50 
                                    text-gray-700 border border-purple-200
                                    rounded py-3 px-4 mb-5 leading-tight 
                                    focus:outline-none focus:bg-white text-md'
                                    id="task-description" 
                                    rows="3"
                                    name='taskDescription'
                                    value={taskDescription}
                                    placeholder='Task description'
                                    onChange={handleInput}
                                    
                                />
                            </div>
                        </form>
                        <div className='flex justify-end p-6 border-purple-50
                            border-t rounded-b'>
                                <Button
                                    variant='contained'
                                    className='bg-purple-800 text-purple-100 
                                    text-xs font-semibold px-3 py-2'
                                    onClick={handleAddTask}
                                >
                                    Add Task
                                </Button>
                        </div>
                    </div>
                </div>
            </>
        ):null}
    </>
  )
}

export default NewTask