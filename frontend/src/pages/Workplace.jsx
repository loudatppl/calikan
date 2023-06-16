import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import BoardList from '../components/BoardList'
import AddBoard from '../components/AddBoard'
import { GrAdd } from 'react-icons/gr'

const Workplace = () => {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);


  const openAddBoardModal = () => {
    setShowAddBoardModal(true);
  };

  const closeAddBoardModal = () => {
    setShowAddBoardModal(false);
  };

  return (
    <div className='flex'>
        <Sidebar />
        <h2 className='text-3xl text-[#0e0e0e] font-bold top-[7%] left-[18%] fixed'>Workplace</h2>
        <div className='fixed top-[13%] left-[18%] w-[80rem] h-[45rem] bg-[#0e0e0e] p-8'>
            <BoardList />
        </div>
        <div className='fixed top-[17%] right-[17%]'>
          { showAddBoardModal && <AddBoard closeModal={closeAddBoardModal} /> }
          <button onClick={openAddBoardModal} className='bg-gray-100 text-[#0e0e0e] font-semibold text-sm px-2 rounded'>
            new board
          </button>
        </div>
    </div>
  )
}

export default Workplace