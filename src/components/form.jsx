const Form = ({ setShowTimer, card, cards, setCards }) => {
    const today = new Date().toISOString().split('T')[0];

    const updateCountdown = (title, date) => {
        const updatedCountdown = {
            ...card,
            title,
            date,
        };

        setCards((prevCards) =>
            prevCards.map((prevCard) =>
            prevCard.id === card.id ? updatedCountdown : prevCard
            )
        );
    };

    const handleSaveBtnClick = (e) => {
        e.preventDefault();
        const title = e.target.form[0].value;
        const date = e.target.form[1].value;
        updateCountdown(title, date);
        setShowTimer(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateCountdown(name === 'title' ? value : card.title, name === 'date' ? value : card.date);
    };

    return (
        <form className="form">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input name="title" placeholder="What's coming next?" required value={card.title || ''} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input name="date" type="date" min={today} required value={card.date || ''} onChange={handleInputChange}/>
            </div>
            <button type="submit" onClick={handleSaveBtnClick} >Save</button>
        </form>
    );
};

export default Form;