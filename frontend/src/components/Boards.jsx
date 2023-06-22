import React, { useEffect, useState } from "react";

import axios from "axios";

import { BsFillBackspaceFill } from "react-icons/bs";

const Boards = () => {
  const [boards, setBoards] = useState(null);
  const [modal, setModal] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [cardModal, setCardModal] = useState(false);

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    fetchBoards();
    fetchCards();
  }, []);

  // GET Boards
  const fetchBoards = () => {
    axios
      .get("https://calikan.onrender.com/api/v1/boards")
      .then((response) => setBoards(response.data.boards))
      .catch((error) => console.error(error));
  };

  // GET Specific Board
  const fetchSpecificBoard = (boardId) => {
    axios
      .get(`https://calikan.onrender.com/api/v1/boards/${boardId}`)
      .then((response) => {
        setSelectedBoard(response.data.board);
      })
      .catch((error) => console.error(error));
  };

  // GET Cards
  const fetchCards = (boardId) => {
    axios
      .get("https://calikan.onrender.com/api/v1/cards", {
        params: { boardId },
      })
      .then((response) => {
        setCards(response.data.cards);
      })
      .catch((error) => console.error(error));
  };

  const createCard = (event) => {
    event.preventDefault();

    axios
      .post("https://calikan.onrender.com/api/v1/cards", {
        task,
        status,
        sourceBoard: selectedBoard.boardId,
      })
      .then(() => {
        const board = selectedBoard.boardId;
        setTask("");
        setStatus("");
        closeCardModal();
        fetchCards(board);
      })
      .catch((error) => console.error(error));
  };

  // DELETE CARD
  const deleteCard = (cardId) => {
    axios
      .delete(`https://calikan.onrender.com/api/v1/cards/${cardId}`, {
        params: { cardId },
      })
      .then((response) => {
        const updatedCards = cards.filter((card) => card.cardId !== cardId);
        setCards(updatedCards);
      })
      .catch((error) => console.error(error));
  };

  // UPDATE CARD
  const updateCardStatus = (cardId, newStatus) => {
    axios
      .put(`https://calikan.onrender.com/api/v1/cards/${cardId}`, {
        status: newStatus,
      })
      .then((response) => {
        const updatedCards = cards.map((card) => {
          if (card.cardId === cardId) {
            return { ...card, status: newStatus };
          }
          return card;
        });

        setCards(updatedCards);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openBoard = (boardId) => {
    fetchSpecificBoard(boardId);
    fetchCards(boardId);
  };

  const handleCloseBoard = () => {
    setSelectedBoard(null);
  };

  const opencardModal = () => {
    setCardModal(true);
  };

  const closeCardModal = () => {
    setCardModal(false);
  };

  // POST Boards
  const createBoard = (event) => {
    event.preventDefault();

    axios
      .post("https://calikan.onrender.com/api/v1/boards", {
        name: boardName,
        description: boardDescription,
      })
      .then((response) => {
        setBoardName("");
        setBoardDescription("");
        handleClose();
        fetchBoards();
      })
      .catch((error) => console.error(error));
  };

  // DELETE Board
  const deleteBoard = (boardId) => {
    axios
      .delete(`https://calikan.onrender.com/api/v1/boards/${boardId}`)
      .then((response) => {
        setBoards((prevBoards) =>
          prevBoards.filter((board) => board.boardId !== boardId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!boards) {
    return null;
  }

  console.log(selectedBoard);

  return (
    <>
      <div className=" mt-28 px-40 py-10 font-body">
        <div className="flex space-x-6 items-center">
          <h2 className="text-2xl text-navy font-semibold">Boards</h2>
          <button
            onClick={handleOpen}
            className="bg-navy px-4 py-1 rounded-md text-dwhite"
          >
            Create
          </button>
        </div>

        <div className="mt-10 w-full grid grid-cols-4 gap-4">
          {boards.map((board) => (
            <div
              key={board.boardId}
              id={board.boardId}
              className=" w-full h-40 bg-sky flex items-center justify-center cursor-pointer relative shadow-md shadow-dblack rounded-md"
            >
              <h3 className="font-body text-lg font-semibold text-navy">
                {board.name}
              </h3>
              <button
                className="absolute text-sm font-bold font-body text-green-400 top-2 right-2"
                onClick={() => openBoard(board.boardId)}
              >
                open
              </button>
              <button
                className="absolute text-sm font-bold font-body text-red-400 bottom-2 right-2"
                onClick={() => deleteBoard(board.boardId)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed flex inset-0 h-screen w-full items-center justify-center">
          <div
            className=" w-[30rem] h-[30rem] bg-navy z-[9999] 
            shadow-md shadow-black rounded-lg relative py-4 px-6"
          >
            <BsFillBackspaceFill
              size={26}
              className="absolute top-2 right-2 text-sky cursor-pointer"
              onClick={handleClose}
            />
            <div className="w-full flex justify-center mb-8">
              <h2 className="text-2xl font-body text-dwhite cursor-pointer ">
                Create a Board
              </h2>
            </div>
            <div className="text-dwhite font-body">
              <form onSubmit={createBoard} className="space-y-2">
                <label className="mr-4" htmlFor="boardName">
                  Board Name:
                </label>
                <input
                  type="text"
                  id="boardName"
                  value={boardName}
                  onChange={(event) => setBoardName(event.target.value)}
                  className="w-[21.2rem] px-2 bg-sky text-dblack"
                />
                <div className="flex flex-col space-y-2">
                  <label className="mr-4" htmlFor="boardName">
                    Board Description:
                  </label>
                  <textarea
                    name="boardDescription"
                    id="boardDescription"
                    value={boardDescription}
                    onChange={(event) =>
                      setBoardDescription(event.target.value)
                    }
                    cols="30"
                    rows="8"
                    className=" bg-sky text-dblack px-2"
                  ></textarea>
                </div>
                <button
                  className="bg-sky px-4 py-1 rounded-md text-navy font-body text-base mt-8"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedBoard && (
        <div className="fixed w-full h-screen flex justify-center items-center inset-0 bg-navy">
          <div className="relative w-full h-full px-40 py-40 grid grid-cols-3 gap-4">
            <BsFillBackspaceFill
              size={26}
              className="absolute top-20 right-10 text-sky cursor-pointer"
              onClick={handleCloseBoard}
            />
            <button
              className="absolute right-32 top-20 items-center bg-sky px-2 py-1 
              rounded-md tex-bold text-navy text-body"
              onClick={opencardModal}
            >
              Create Card
            </button>
            <div className="w-full flex flex-col bg-sky py-4 px-4 shadow-md shadow-dblack rounded-md overflow-y-auto column">
              <div className="flex justify-center py-2 mb-4">
                <h2 className="text-2xl cursor-pointer font-bold font-body text-navy">
                  TODO
                </h2>
              </div>
              <div className="w-full flex flex-col space-y-2">
                {cards
                  .filter((card) => card.status === "todo")
                  .map((card) => (
                    <div
                      key={card.cardId}
                      className="bg-navy rounded-md p-4 relative shadow-sm h-20 shadow-dblack"
                    >
                      <div className="w-full h-full items-center flex justify-center relative">
                        <h2 className="text-lg font-body text-sky cursor-pointer">
                          {card.task}
                        </h2>
                        <button
                          className="absolute top-0 right-0 text-sky text-sm"
                          onClick={() => deleteCard(card.cardId)}
                        >
                          delete
                        </button>
                        <select
                          className="absolute left-0 bottom-0 bg-sky text-navy text-sm font-body font-bold"
                          value={card.status}
                          onChange={(event) =>
                            updateCardStatus(card.cardId, event.target.value)
                          }
                        >
                          <option value="todo">Todo</option>
                          <option value="doing">Doing</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full flex flex-col bg-sky py-4 px-4 shadow-md shadow-dblack rounded-md overflow-y-auto column">
              <div className="flex justify-center py-2 mb-4">
                <h2 className="text-2xl cursor-pointer font-bold font-body text-navy">
                  DOING
                </h2>
              </div>
              <div className="w-full flex flex-col space-y-2">
                {cards
                  .filter((card) => card.status === "doing")
                  .map((card) => (
                    <div
                      key={card.cardId}
                      className="bg-navy rounded-md p-4 relative shadow-sm h-20 shadow-dblack"
                    >
                      <div className="w-full h-full items-center flex justify-center relative">
                        <h2 className="text-lg font-body text-sky cursor-pointer">
                          {card.task}
                        </h2>
                        <button
                          className="absolute top-0 right-0 text-sky text-sm"
                          onClick={() => deleteCard(card.cardId)}
                        >
                          delete
                        </button>
                        <select
                          className="absolute left-0 bottom-0 bg-sky text-navy text-sm font-body font-bold"
                          value={card.status}
                          onChange={(event) =>
                            updateCardStatus(card.cardId, event.target.value)
                          }
                        >
                          <option value="todo">Todo</option>
                          <option value="doing">Doing</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full flex flex-col bg-sky py-4 px-4 shadow-md shadow-dblack rounded-md overflow-y-auto column">
              <div className="flex justify-center py-2 mb-4">
                <h2 className="text-2xl cursor-pointer font-bold font-body text-navy">
                  DONE
                </h2>
              </div>
              <div className="w-full flex flex-col space-y-2">
                {cards
                  .filter((card) => card.status === "done")
                  .map((card) => (
                    <div
                      key={card.cardId}
                      className="bg-navy rounded-md p-4 relative shadow-sm h-20 shadow-dblack"
                    >
                      <div className="w-full h-full items-center flex justify-center relative">
                        <h2 className="text-lg font-body text-sky cursor-pointer">
                          {card.task}
                        </h2>
                        <button
                          className="absolute top-0 right-0 text-sky text-sm"
                          onClick={() => deleteCard(card.cardId)}
                        >
                          delete
                        </button>
                        <select
                          className="absolute left-0 bottom-0 bg-sky text-navy text-sm font-body font-bold"
                          value={card.status}
                          onChange={(event) =>
                            updateCardStatus(card.cardId, event.target.value)
                          }
                        >
                          <option value="todo">Todo</option>
                          <option value="doing">Doing</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {cardModal && (
        <div className="fixed inset-0 w-full h-screen flex justify-center items-center">
          <div
            className=" w-[30rem] h-[30rem] bg-navy z-[9999] 
            shadow-md shadow-black rounded-lg relative py-4 px-6"
          >
            <BsFillBackspaceFill
              size={26}
              className="absolute top-2 right-2 text-sky cursor-pointer"
              onClick={closeCardModal}
            />
            <div className="w-full flex justify-center mb-8">
              <h2 className="text-2xl font-body text-dwhite cursor-pointer ">
                Create a Card
              </h2>
            </div>
            <div className="text-dwhite font-body">
              <form onSubmit={createCard} className="space-y-2">
                <label className="mr-4" htmlFor="cardName">
                  Task:
                </label>
                <input
                  type="text"
                  id="cardName"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  className="w-[23.8rem] px-2 bg-sky text-dblack"
                />
                <div className="flex flex-col space-y-2">
                  <label className="mr-4" htmlFor="cardStatus">
                    Status:
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-2 py-1 bg-sky text-dblack"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <button
                  className="bg-sky px-4 py-1 rounded-md text-navy font-body text-base mt-8"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Boards;
