import React from 'react'
import { Button } from '@mui/material'
import { useState, useEffect, useReducer } from 'react'

const initialState = {
    editModal: false,
    taskName: '',
    taskDescription: '',
    errorMessage: '',
};
  
const reducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          editModal: true,
          taskName: action.taskName,
          taskDescription: action.taskDescription,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          editModal: false,
        };
      case 'SET_TASK_NAME':
        return {
          ...state,
          taskName: action.taskName,
        };
      case 'SET_TASK_DESCRIPTION':
        return {
          ...state,
          taskDescription: action.taskDescription,
        };
      case 'SET_ERROR_MESSAGE':
        return {
          ...state,
          errorMessage: action.errorMessage,
        };
      default:
        throw new Error(`Invalid action type: ${action.type}`);
    }
};

const EditTask = ({ task, index, taskList, setTaskList }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      dispatch({
        type: 'OPEN_MODAL',
        taskName: task.taskName,
        taskDescription: task.taskDescription,
      });
    }, [task]);
  
    const handleInput = (e) => {
      const { name, value } = e.target;
      if (name === 'taskName') {
        dispatch({
          type: 'SET_TASK_NAME',
          taskName: value,
        });
      } else if (name === 'taskDescription') {
        dispatch({
          type: 'SET_TASK_DESCRIPTION',
          taskDescription: value,
        });
      }
    };
  
    const handleUpdateTask = (e) => {
      e.preventDefault();
  
      if (!state.taskName.trim() || !state.taskDescription.trim()) {
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          errorMessage: 'Please enter a task name and description',
        });
        return;
      }
  
      const updatedTaskList = [...taskList];
      updatedTaskList[index] = {
        taskName: state.taskName,
        taskDescription: state.taskDescription,
      };
      setTaskList(updatedTaskList);
      localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
      dispatch({ type: 'CLOSE_MODAL' });
    };

    return (
        <>
          <Button
            variant='text'
            className='text-purple-800 text-xs font-semibold'
            onClick={() => setEditModal(true)}
          >
            Edit
          </Button>
          {state.editModal && (
            <div className='flex overflow-x-hidden overflow-y-auto fixed inset-0 z-100 items-center justify-center mt-12'>
              <div className='flex flex-col relative w-9/12 bg-purple-100 rounded-lg shadow-md max-w-xs'>
                <div className='flex flex-row justify-between pl-4 py-4 border-b border-purple-50 rounded-t'>
                  <h2 className='text-xl font-bold uppercase'>New Task</h2>
                  <Button
                    variant='text'
                    className='text-purple-800 text-xs font-semibold float-right block'
                    onClick={() => dispatch({type: 'CLOSE_MODAL'})}
                  >
                    x
                  </Button>
                </div>
                <form className='px-6 pt-6 pb-4'>
                  <div>
                    <label
                      className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 block'
                      htmlFor='task-name'
                    >
                      Task Name
                    </label>
                    <input
                      className='w-full bg-purple-50 text-gray-700 border border-purple-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white text-md'
                      id='task-name'
                      type='text'
                      name='taskName'
                      value={state.taskName}
                      placeholder='Task name'
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 block'
                      htmlFor='task-description'
                    >
                      Task description
                    </label>
                    <textarea
                      className='w-full bg-purple-50 text-gray-700 border border-purple-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white text-md'
                      id='task-description'
                      rows='3'
                      name='taskDescription'
                      value={state.taskDescription}
                      placeholder='Task description'
                      onChange={handleInput}
                    />
                  </div>
                </form>
                <div className='flex justify-end p-6 border-purple-50 border-t rounded-b'>
                  <Button
                    variant='contained'
                    className='bg-purple-800 text-purple-100 text-xs font-semibold px-3 py-2'
                    onClick={handleUpdateTask}
                  >
                    Update Task
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      );
}

export default EditTask