import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

function AddPlacePopup({ isOpen, onAddPlace, onClose, ...props }) {
  const [saveBtnText, setSaveBtnText] = React.useState("Создать");
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation({ name: "", link: "" });

  React.useEffect(() => {
    resetForm({ name: "", link: "" });
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setSaveBtnText("Сохраняю...");

    // forwards the data and func to change the text in btn
    onAddPlace(values, () => setSaveBtnText("Создать"));
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
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
          maxLength="30"
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
            errors.link ? `popup__input_type_error` : ``
          }`}
          value={values.link}
          onChange={handleChange}
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          required
        />
        <span
          className={`popup__error ${
            errors.link ? `popup__error_visible` : ``
          }`}
        >
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
