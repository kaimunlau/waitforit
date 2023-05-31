const Form = ({ setShowTimer, card, cards, setCards }) => {
    const today = new Date().toISOString().split('T')[0];

    const handleSaveBtnClick = (e) => {
        e.preventDefault();

        const countdown = {
            id: card.id,
            title: e.target.form[0].value,
            date: e.target.form[1].value
        };
        card.title = countdown.title;
        card.date = countdown.date;

        // update cards array this way to trigger useEffect in App.js
        const updatedCards = cards.filter((toUpdate) => toUpdate.id !== card.id);
        updatedCards.push(countdown)
        setCards(updatedCards);

        setShowTimer(true);
    }

    return (
        <form className="form">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input name="title" placeholder="What's coming next?" required value={card.title !== '' && card.title}/>
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input name="date" type="date" min={today} required value={card.date !== '' && card.date} />
            </div>
            <button type="submit" onClick={handleSaveBtnClick} >Save</button>
        </form>
    );
};

export default Form;