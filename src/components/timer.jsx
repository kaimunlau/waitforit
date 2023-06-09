import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './card.css';
import { useEffect, useState } from "react";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const Timer = ({ setShowTimer, countdownDetails, removeCard }) => {
  const [timer, setTimer] = useState('Mathing this one out...');
  const { title, date } = countdownDetails;

  const handleDeleteBtnClick = () => {
    removeCard();
  }

  const handleEditBtnClick = () => {
    setShowTimer(false);
  }

  useEffect(() => {
    // Calculate time left and update element every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const then = new Date(date).getTime();
      const distance = then - now;

      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);

      function formatTwoDigits(number) {
        return String(number).padStart(2, '0');
      }
      
      setTimer(() => {
        return (
          <>
            <span>{formatTwoDigits(days)}</span>d&nbsp;
            <span>{formatTwoDigits(hours)}</span>h&nbsp;
            <span>{formatTwoDigits(minutes)}</span>m&nbsp;
            <span>{formatTwoDigits(seconds)}</span>s
          </>
        )
      })

      if (distance <= 0) {
        clearInterval(interval);
        setTimer('Done!')
      }
    }, 1000)
  }, [])

  return (
        <div className='timer-container'>
          <div className='card-btn-container'>
              <FontAwesomeIcon className='icon' icon={faPencil} onClick={handleEditBtnClick} />
              <FontAwesomeIcon className='icon' icon={faTrash} onClick={handleDeleteBtnClick} />
          </div>
          <h2 className='timer-title'>{title}</h2>
          <p>{timer}</p>
        </div>
  );
};

export default Timer;