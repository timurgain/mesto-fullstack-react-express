import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  handleCardClick,
  handleLikeClick,
  handleCardDelete,
  ...props
}) {
  const currentUser = React.useContext(CurrentUserContext);

  function renderCards() {
    return cards.map((card) => {
      return (
        <Card
          key={card._id}
          card={card}
          onCardClick={handleCardClick}
          onLikeClick={handleLikeClick}
          onTrashClick={handleCardDelete}
        />
      );
    });
  }

  return (
    <main className="content">
      {/* <!-- Profile section --> */}
      <section className="profile" aria-label="Профиль пользователя">
        <figure className="profile__figure">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
            aria-label="Изображение пользователя"
          />

          <figcaption className="profile__caption">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              onClick={onEditProfile}
              aria-label="Кнопка редактирования профиля пользователя"
            />
            <p className="profile__description">{currentUser.about}</p>
          </figcaption>
        </figure>

        <button
          className="profile__add-btn"
          type="button"
          onClick={onAddPlace}
        />
      </section>

      {/* <!-- Cards section --> */}
      <section className="elements" aria-label="Места пользователя">
        <ul className="elements__cards">{renderCards()}</ul>
      </section>
    </main>
  );
}

export default Main;
