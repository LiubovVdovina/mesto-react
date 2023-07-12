function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }  

  return(
    <li className="card">
      <img className="card__img" src={card.link} alt={card.name} onClick={handleClick}/>
      <button className="button button_type_remove" type="button"></button>  
      <div className="card__label">
        <p className="card__caption">{card.name}</p>
        <div className="card__likes">
          <button className="button button_type_like" type="button"></button>
          <div className="card__likes-number">{card.likes.length}</div>
        </div>         
      </div>
    </li>
  );
}

export default Card;