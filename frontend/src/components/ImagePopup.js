function ImagePopup({ isOpen, card, onClose, ...props }) {
  return (
    <div
      className={isOpen ? `popup card-popup popup_opened` : `popup card-popup`}
      aria-label="Окно просмотра фото"
      onMouseDown={onClose}
    >
      <figure className="popup__card">
        <button className="popup__close-btn" type="button"></button>
        <img
          className="popup__image"
          src={!!card ? card.link : null}
          alt={!!card ? card.name : null}
        />
        <figcaption>
          <p className="popup__caption">{!!card ? card.name : null}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
