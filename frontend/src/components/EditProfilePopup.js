import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [saveBtnText, setSaveBtnText] = React.useState("Сохранить");
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation({ name: currentUser.name, about: currentUser.about });

  React.useEffect(() => {
    resetForm({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setSaveBtnText("Сохраняю...");
    // forwards the data
    onUpdateUser(values, () => setSaveBtnText("Сохранить"));
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      saveBtnText={saveBtnText}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      isValid={isValid}
    >
      <div className="popup__field">
        <input
          className={`popup__input ${
            errors.name ? `popup__input_type_error` : ``
          }`}
          value={values.name}
          onChange={handleChange}
          name="name"
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          className={`popup__error ${
            errors.name ? `popup__error_visible` : ``
          }`}
        >
          {errors.name}
        </span>
      </div>

      <div className="popup__field">
        <input
          className={`popup__input ${
            errors.about ? `popup__input_type_error` : ``
          }`}
          value={values.about}
          onChange={handleChange}
          name="about"
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className={`popup__error ${
            errors.about ? `popup__error_visible` : ``
          }`}
        >
          {errors.about}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
