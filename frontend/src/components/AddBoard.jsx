import React, { useState } from "react";
import { BsFillBackspaceFill } from "react-icons/bs";
import axios from "axios";

const AddBoard = ({ closeModal }) => {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleBoardDescriptionChange = (event) => {
    setBoardDescription(event.target.value);
  };

  const handleAddBoard = async () => {
    try {
      const response = await axios.post(
        "https://calikan.onrender.com/api/v1/boards",
        {
          name: boardName,
          description: boardDescription,
        }
      );
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  return (
    <div className="fixed bg-gray-300 w-[30rem] h-[35rem] top-[21%] left-[39%] px-10 pt-5">
      <div className="flex justify-between">
        <h2 className="text-[#0e0e0e] font-bold text-lg cursor-pointer">
          Add New Board
        </h2>
        <button onClick={closeModal}>
          <BsFillBackspaceFill size={20} />
        </button>
      </div>
      <div className="mb-4">
        <label
          htmlFor="boardName"
          className="text-[#0e0e0e] block font-medium mb-1 mt-[3rem]"
        >
          Board Name
        </label>
        <input
          type="text"
          id="boardName"
          value={boardName}
          onChange={handleBoardNameChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="boardDescription" className="block font-medium mb-1">
          Board Description
        </label>
        <textarea
          id="boardDescription"
          value={boardDescription}
          onChange={handleBoardDescriptionChange}
          className="border rounded w-full py-2 px-3"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#0e0e0e] text-white px-4 py-2 rounded text-sm"
          onClick={handleAddBoard}
        >
          Add
        </button>
        <button
          className="bg-gray-200 text-gray-700 ml-2 px-4 py-2 rounded text-sm"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddBoard;
