import React from "react";
import hamburgerMenuPath from "../../images/menu_line_icon.svg";
import closeMenuPath from "../../images/popup__close-button.svg";

function MenuButton({ onClick, isMenuOpened, ...props }) {
  function getBackground() {
    return isMenuOpened
      ? {
          backgroundImage: `url(${closeMenuPath})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `24px 24px`,
        }
      : {
          backgroundImage: `url(${hamburgerMenuPath})`,
          backgroundRepeat: `space`,
          backgroundSize: `24px 8px`,
        };
  }

  return (
    <button
      className="header__menu-btn"
      type="button"
      style={getBackground()}
      onClick={onClick}
    />
  );
}

export default MenuButton;
