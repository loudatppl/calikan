import React from 'react'
import Cards from './Cards'
import axios from 'axios';
import { useState } from 'react';

const Columns = ( { todoCards, doingCards, doneCards, onDeleteCard, card} ) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState(''); 

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleUpdateCard = async () => {
        try {
        await axios.put(`http://localhost:8000/api/v1/cards/${card.cardId}`, { task: editedTask });
        setEditMode(false);
        } catch (error) {
        console.error('Error updating card:', error);
        }
    };

  const handleInputChange = (event) => {
    setEditedTask(event.target.value);
  };



  return (
    <div className='flex gap-8 w-[65rem] h-20 fixed left-[24%] top-[33%] justify-between text-center'>
        <div className='flex flex-col w-1/3'>
            <h3 className='text-md font-medium bg-green-700 text-gray-100 py-1 mb-4'>TODO</h3>
            {todoCards.map( (card) => (
                <div key={card.cardId} className='bg-green-500 mb-2 py-4 rounded shadow-md'>
                    <h4 className='text-[#0e0e0e] text-md font-medium'> 
                        {card.task}
                        {editMode ? (
                        <input
                            type="text"
                            value={editedTask}
                            onChange={handleInputChange}
                            onBlur={handleUpdateCard}
                            className='outline-none bg-gray-100 rounded shadow-md text-center py-1'
                        />
                        ) : (
                        <span onClick={() => toggleEditMode(card.cardId)}>{card.task}</span>
                        )}
                    </h4>
                    <button onClick={ () => onDeleteCard( card.cardId )} className='text-sm text-red-700 px-2 py-1 rounded mt-4'> 
                        delete
                    </button>
                </div>
            ))}
        </div>
        <div className='flex flex-col w-1/3'>
            <h3 className='text-md font-medium bg-purple-700 text-gray-100 py-1 mb-4' >DOING</h3>
            {doingCards.map( (card) => (
                <div key={card.cardId} className='bg-purple-500 mb-2 py-4 rounded shadow-md'>
                    <h4>{card.task}</h4>
                    <button onClick={ () => onDeleteCard( card.cardId )} className='text-sm text-red-700 px-2 py-1 rounded mt-4'> 
                        delete
                    </button>
                </div>
            ))}
        </div>
        <div className='flex flex-col w-1/3'>
            <h3 className='text-md font-medium bg-pink-700 text-gray-100 py-1 mb-4' >DONE</h3>
            {doneCards.map( (card) => (
                <div key={card.cardId} className='bg-pink-500 mb-2 py-4 rounded shadow-md'>
                    <h4>{card.task}</h4>
                    <button onClick={ () => onDeleteCard( card.cardId )} className='text-sm text-red-700 px-2 py-1 rounded mt-4'> 
                        delete
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Columns