import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = ({ handlePlusBtnClick, inFocus }) => {
    return (
        <>
            <h1 className='main-title'>Wait<span>for</span>.it</h1>
            <div className={`icon-container shake-on-hover ${inFocus}`} onClick={handlePlusBtnClick}>
                <FontAwesomeIcon icon={faPlus} className='icon-new' />
            </div>
        </>
    )
}

export default Header;