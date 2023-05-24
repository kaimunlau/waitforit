import Card from './components/card';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [cards, setCards] = useState([]); // State for storing all timer objects
  const cardIdRef = useRef(0); // Ref for generating unique ID

  useEffect(() => {
    // Load saved cards from localStorage on component mount
    const savedCards = localStorage.getItem('countdowns');
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      setCards(parsedCards); // Set the loaded cards as the initial state
      const maxId = parsedCards.reduce((max, card) => Math.max(max, card.id), 0);
      cardIdRef.current = maxId + 1; // Set the next ID based on the highest existing ID
    }
  }, []);

  const removeCard = (id) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== id);
      localStorage.setItem('countdowns', JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  const addNewCard = (title = '', date = '') => {
    const newCard = { id: generateUniqueId(), title, date };
    setCards([...cards, newCard]);
  }

  const generateUniqueId = () => {
    cardIdRef.current += 1;
    return cardIdRef.current;
  };

  useEffect(() => {
    // Save non-default cards to localStorage whenever the cards state changes
    const nonDefaultCards = cards.filter((card) => card.title !== '')
    if (nonDefaultCards.length > 0) {
      localStorage.setItem('countdowns', JSON.stringify(nonDefaultCards));
    }
  }, [cards])

  const handlePlusBtnClick = () => {
    addNewCard();
  }
  
  return (
    <div className="App">
      <div className='bg'></div>
      <div className='content'>
        <header className="App-header">
          <h1 className='main-title'>Waitfor.it</h1>
          <div className='icon-container'>
            <FontAwesomeIcon icon={faPlus} className='icon-new' onClick={handlePlusBtnClick}/>
          </div>
        </header>
        <main className='main'>
          <div className='timers' >
            {!cards ? <div>loading...</div> :
            cards.map((card) => {
              return (
                  <Card 
                    key={card.id} 
                    card={card} 
                    removeCard={() => removeCard(card.id)} 
                    cards={cards} 
                    setCards={setCards}
                  />
                )
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
