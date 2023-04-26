import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthUserContext from "../../contexts/AuthUserContext.js";

function AuthButton({isMobile, onLogout, ...props}) {
  const { loggedIn } = React.useContext(AuthUserContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (  // returns only one button
    <>

      {pathname === "/" && loggedIn && (
        <button
          className="header__auth-btn link"
          type="button"
          onClick={onLogout}
        >
          Выйти
        </button>
      )}

      {pathname === "/sign-up" && !loggedIn && (
        <button
          className="header__auth-btn link"
          type="button"
          onClick={() => navigate("/sign-in")}
        >
          Войти
        </button>
      )}

      {pathname === "/sign-in" && !loggedIn && (
        <button
          className="header__auth-btn link"
          type="button"
          onClick={() => navigate("/sign-up")}
        >
          Регистрация
        </button>
      )}

    </>
  );
}

export default AuthButton
