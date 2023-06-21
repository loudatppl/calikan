import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Columns from "./Columns";

const Cards = ({ children, boardId, card }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `https://calikan.onrender.com/api/v1/cards?boardId=${boardId}`
      );
      setCards(response.data.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const filterCardsByStatus = (status) => {
    return cards.filter((card) => card.status === status);
  };

  const deleteCard = async (cardId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/cards/${cardId}`);
      setCards((prevCards) =>
        prevCards.filter((card) => card.cardId !== cardId)
      );
    } catch (error) {
      console.log("Error deleting card:", error);
    }
  };

  return children(filterCardsByStatus, deleteCard);
};

export default Cards;
