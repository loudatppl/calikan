import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDown } from 'react-icons/ai'
import BoardDisplay from "./BoardDisplay";

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [showList, setShowList] = useState(false);
    const [selectedboard, setSelectedBoard] = useState(null);

    useEffect( () => {
        fetchBoards();
    }, [])

    const fetchBoards = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/boards');
          setBoards(response.data.boards);
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
    };

    const toggleBoardList = () => {
        setShowList( !showList )
    }

    const selectBoard = (board) => {
        setSelectedBoard( board )
        setShowList( !showList )
    }

    const closeBoard = () => {
        setSelectedBoard( null );
    }

  return (
    <div>
        <div className="text-gray-100 font-medium text-md cursor-pointer flex gap-8 items-center">
            <h2>Boards</h2>
            <AiOutlineDown onClick={toggleBoardList}/>
        </div>
      
      {showList && (
        <div className="bg-gray-100 w-[6rem] mt-6 cursor-pointer rounded shadow-lg py-1 px-2 fixed">
            <ul className="text-sm font-medium">
                {boards.map((board) => (
                <li key={board.boardId} onClick={ () => selectBoard(board)}>{board.name}</li>
                ))}
            </ul>
        </div>
      )}
      
        {selectedboard && (
            <BoardDisplay board={selectedboard} onCloseBoard={closeBoard}/>
        )}
    </div>
  )
}

export default BoardList