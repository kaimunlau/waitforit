import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NoCardsOverlay = () => {
    return (
        <div className='no-cards-overlay'>
            <p>Tap <FontAwesomeIcon icon={faPlus} className='icon-new' /> to add a new Countdown</p>
        </div>
    );
};

export default NoCardsOverlay;