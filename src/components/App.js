import React from 'react';

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
  
  return(
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/ >
      <Footer />
      <PopupWithForm title='Редактировать профиль' name='edit' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" placeholder="Введите ваше имя" className="form__input form__input_type_name" name="name" id="name-input" required minLength="2" maxLength="40" />
        <span className="form__input-error name-input-error"></span>
        <input type="text" placeholder="Введите вашу профессию" className="form__input form__input_type_job" name="job" id="job-input" required minLength="2" maxLength="200" />
        <span className="form__input-error job-input-error"></span>
        <button className="button button_type_submit" type="submit">Сохранить</button>
      </PopupWithForm> 
      
      <PopupWithForm title='Новое место' name='place' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" placeholder="Название" className="form__input form__input_type_place" name="place" id="place-input" required minLength="2" maxLength="30" />
        <span className="form__input-error place-input-error"></span>
        <input type="url" placeholder="Ссылка на картинку" className="form__input form__input_type_src" name="src" id="src-input" required />
        <span className="form__input-error src-input-error"></span>
        <button className="button button_type_submit" type="submit">Создать</button>
      </PopupWithForm> 

      <PopupWithForm title='Обновить аватар' name='avatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" placeholder="Ссылка на аватар" className="form__input form__input_type_src" name="src" id="avatar-input" required />
        <span className="form__input-error avatar-input-error"></span>
        <button className="button button_type_submit" type="submit">Сохранить</button>
      </PopupWithForm> 

      <PopupWithForm title='Вы уверены' name='remove'> 
        <button className="button button_type_submit" type="submit">Да</button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
  </>
  );
}

export default App;
