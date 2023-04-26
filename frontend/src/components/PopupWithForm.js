import React from "react";

function PopupWithForm({
  name,
  title,
  saveBtnText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  ...props
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
      aria-label={title}
      onMouseDown={onClose}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close-btn" type="button" />
        <h2 className={`popup__header popup__header_type_${name}`}>{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          action="#"
          onSubmit={onSubmit}
          noValidate
        >
          
          {props.children}

          <button
            className={`popup__save-btn ${
              !isValid ? `popup__save-btn_disabled` : ``
            }`}
            type="submit"
            disabled={!isValid}
          >
            {saveBtnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
