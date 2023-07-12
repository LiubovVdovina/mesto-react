import React from 'react';
import Card from './Card'
import * as apiModule from '../utils/Api'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {

    apiModule.api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => console.log(err))
    
    apiModule.api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards)
        // console.log(cards.length); 
      })
      .catch((err) => console.log(err))

  },[]);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container"><img className="profile__avatar" src={userAvatar} alt="аватар пользователя" onClick={onEditAvatar}/></div>
        <div className="profile__info">
          <div className="profile__top-row">
            <h1 className="profile__name">{userName}</h1> 
            <button className="button button_type_edit" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="button button_type_add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => {
            return(
              <Card card={card} key={card._id} onCardClick={onCardClick}></Card>
            )})
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;