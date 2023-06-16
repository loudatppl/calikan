import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Card = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
      fetchCards();
    }, []);
  
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/cards');
        setCards(response.data.cards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

  return (
    <div>Card</div>
  )
}

export default Card