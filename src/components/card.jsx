import { useState } from 'react';
import './card.css';
import Form from './form';
import Timer from "./timer";

const Card = ({ card, removeCard, cards, setCards }) => {
  const [showTimer, setShowTimer] = useState(() => {
    return card.title !== '' && card.date !== '' // If card data is default, showTimer = false
  });

  return (
    <div className='card-container glass shake-on-hover'>
      {showTimer ? 
      <Timer setShowTimer={setShowTimer} countdownDetails={card} removeCard={removeCard}/> : 
      <Form setShowTimer={setShowTimer} card={card} cards={cards} setCards={setCards}/>}
    </div>
  );
};

export default Card;