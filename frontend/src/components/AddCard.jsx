import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const AddCard = ( { boardId } ) => {
    const [task, setTask] = useState('')
    const [status, setStatus] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/cards', {
             task,
             status,
             sourceBoard: boardId,
            });

            setTask('');
            setStatus('')
            setShowModal(false)
        } catch ( error ) {
            console.log( 'Error creating card: ', error )
        }
    } 

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
        <button onClick={handleOpenModal} className='text-2xl text-gray-100 fixed top-[32.8%] left-[39%]'>+</button>
        {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-gray-300 rounded-md p-6">
            <div className='flex justify-between '>
              <h2 className="text-lg font-bold mb-4">Add Card</h2>
              <button className='ml-[8rem] font-bold' onClick={handleCloseModal}>x</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">Task</label>
                <input
                  type="text"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Status</label>
                <select
                  value={status}
                  onChange={ (event) => setStatus(event.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 outline-none"
                  required
                >
                  <option value="">Select status</option>
                  <option value="todo">To Do</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <button type="submit" className="bg-[#0e0e0e] text-white rounded px-3 py-1 text-sm">
                add card
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default AddCard