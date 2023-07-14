import React from 'react';

import {api} from '../utils/Api'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({}); // переменная состояния, хранящая данные текущего пользователя

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err))
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }


  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => console.log(err))

  },[]);


  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => 
            c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {

    api.removeCard(card._id)
    .then(() => setCards((state) => state.filter((c)=> c._id != card._id)))
    .catch((err) => console.log(err))
  }
  
  return(
    <CurrentUserContext.Provider value={currentUser}>
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}/ >
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      
      <PopupWithForm title='Новое место' name='place' buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" placeholder="Название" className="form__input form__input_type_place" name="place" id="place-input" required minLength="2" maxLength="30" />
        <span className="form__input-error place-input-error"></span>
        <input type="url" placeholder="Ссылка на картинку" className="form__input form__input_type_src" name="src" id="src-input" required />
        <span className="form__input-error src-input-error"></span>
      </PopupWithForm> 

      <PopupWithForm title='Обновить аватар' name='avatar' buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" placeholder="Ссылка на аватар" className="form__input form__input_type_src" name="src" id="avatar-input" required />
        <span className="form__input-error avatar-input-error"></span>
      </PopupWithForm> 

      <PopupWithForm title='Вы уверены' name='remove' buttonText='Да'> 
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
  </>
  </CurrentUserContext.Provider>
  );
}

export default App;
