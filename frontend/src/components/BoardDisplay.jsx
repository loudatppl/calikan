import React, { useState } from 'react'
import { BsBackspaceFill } from 'react-icons/bs'
import axios from 'axios'
import Columns from './Columns';
import Cards from './Cards';
import AddCard from './AddCard';

const BoardDisplay = ( { board, onCloseBoard } ) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(board.name);
  const [showCardModal, setShowCardModal] = useState(false)

  const handleAddCardOpen = () => {
    setShowCardModal(true)
  }

  const handleAddCardClose = () => {
    setShowCardModal(false)
  }

  const toggleEditMode = () => {
    setEditMode( !editMode )
  }

  const updateBoard = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/boards/${board.boardId}`, { name: editedName });
      setEditMode( false );
      board.name = editedName;
    } catch ( error ) {
      console.error('Error updating board:', error);
    }
  }

  const onInputChange = (event) => {
    setEditedName(event.target.value);
  };

  const deleteBoard = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/boards/${board.boardId}`);
      onCloseBoard()
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  }

  return (
    <div className=' bg-gray-300 w-[76rem] h-[38rem] flex justify-center rounded mt-6'>
        <h2 className='text-xl font-bold text-[#0e0e0e] mt-10'>
          { editMode ? (
            <input 
              type="text" 
              value={editedName}
              onChange={onInputChange}
              onBlur={updateBoard}
              className='outline-none bg-gray-100 rounded shadow-md text-center w-[15rem] py-1'
            />
          ) :(
            <span onClick={toggleEditMode}>{board.name}</span>
          )}
        </h2>
        <div className='fixed top-[14rem] right-[22rem]'>
            <button onClick={onCloseBoard}><BsBackspaceFill size={20} /></button>
        </div>
        <div className='fixed right-[22rem] bottom-[11rem] bg-[#0e0e0e] px-3 rounded py-1 items-center'>
            <button onClick={deleteBoard} className='text-gray-100 text-sm font-medium'>delete</button>
        </div>
        
      <Cards boardId={board.boardId}>
        {(filterCardsByStatus, deleteCard) => (
          <Columns 
            todoCards={filterCardsByStatus('todo')}
            doingCards={filterCardsByStatus('doing')}
            doneCards={filterCardsByStatus('done')}
            onDeleteCard={deleteCard}
          />
        )}
      </Cards>
      <AddCard boardId={board.boardId} />
    </div>
  )
}

export default BoardDisplay