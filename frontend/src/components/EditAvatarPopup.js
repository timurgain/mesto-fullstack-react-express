import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, ...props }) {
  const [saveBtnText, setSaveBtnText] = React.useState("Сохранить");
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation({ link: "" });

  React.useEffect(() => {
    resetForm({ link: "" });
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setSaveBtnText("Сохраняю...");
    // forwards the data
    onUpdateAvatar(values, () => setSaveBtnText("Сохранить"));
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      saveBtnText={saveBtnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__field">
        <input
          className={`popup__input ${
            errors.link ? `popup__input_type_error` : ``
          }`}
          value={values.link}
          onChange={handleChange}
          name="link"
          type="url"
          placeholder="Ссылка на изображение"
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

export default EditAvatarPopup;
