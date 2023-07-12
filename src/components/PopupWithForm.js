function PopupWithForm({name, title, isOpen, onClose, children}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__wrapper">
          <button className="button button_type_close" type="button" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form className="form" name={`${name}-form`} noValidate>
            {children}
          </form>
        </div>
      </div>  
  );
}

export default PopupWithForm;