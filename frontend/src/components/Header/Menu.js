import React from "react";
import AuthButton from "./AuthButton.js";
import AuthUserContext from "../../contexts/AuthUserContext.js";


function Menu({isMobile, isMenuOpened, onLogout, ...props}) {
  const { authUser } = React.useContext(AuthUserContext);

  return (
    <div className={`header__menu ${isMenuOpened && "header__menu_type_mobile"}`}>
      <span className="header__auth-email">{authUser.email}</span>
      <AuthButton isMobile={isMobile} onLogout={onLogout} />
    </div>
  )
}


export default Menu;
