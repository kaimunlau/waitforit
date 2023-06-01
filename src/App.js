import Card from './components/card';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Header from './components/header';
import NoCardsOverlay from './components/noCardsOverlay';


function App() {
  const [cards, setCards] = useState([]); // State for storing all timer objects
  const [inFocus, setInFocus] = useState(''); // State for bringing New Card btn in focus

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

  useEffect(() => {
    // Put New Card button in focus if no cards exist
    const timeout = setTimeout(() => {
      if (cards.length === 0) {
        setInFocus('in-focus');
      }
    }, 500);
  
    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount or when cards change
  
  }, [cards]);

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
    setInFocus('');
    addNewCard();
  }
  
  return (
    
    <div className={`App`}>
      {inFocus !== '' && <NoCardsOverlay />}
      <div className='background-image'></div>
      <header className="App-header glass">
        <Header handlePlusBtnClick={handlePlusBtnClick} inFocus={inFocus}/>
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
  );
}

export default App;
