import React from "react";
import AuthUserContext from "../../contexts/AuthUserContext.js";
import MenuButton from "./MenuButton.js";
import Logo from "./Logo.js";
import Menu from "./Menu.js";
import { useLocation } from "react-router-dom";

const MOBILE_WIDTH_FROM = 767;

function Header({ onLogout, ...props }) {
  const { loggedIn } = React.useContext(AuthUserContext);

  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  React.useEffect(() => {
    function handleScreenResize() {
      window.innerWidth <= MOBILE_WIDTH_FROM
        ? setIsMobile(true)
        : setIsMobile(false);
    }
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  React.useEffect(() => {
    setIsMenuOpened(false);
  }, [isMobile, location]);

  function handleMenuBtnClick() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <header className={`header ${isMenuOpened && "header_type_mobile-menu"}`}>

      {isMenuOpened && (
        <Menu
          isMobile={isMobile}
          isMenuOpened={isMenuOpened}
          onLogout={onLogout}
        />
      )}

      {isMobile && loggedIn && (
        <>
          <Logo />
          <MenuButton
            isMenuOpened={isMenuOpened}
            onClick={handleMenuBtnClick}
          />
        </>
      )}

      {isMobile && !loggedIn && (
        <>
          <Logo />
          <Menu
            isMobile={isMobile}
            isMenuOpened={isMenuOpened}
            onLogout={onLogout}
          />
        </>
      )}

      {!isMobile && (
        <>
          <Logo />
          <Menu
            isMobile={isMobile}
            isMenuOpened={isMenuOpened}
            onLogout={onLogout}
          />
        </>
      )}

    </header>
  );
}

export default Header;
