function usePopupClosing(isOpen, setIsOpen) {

  function escClose() {
    
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }

  function clickClose(evt) {
    const isClosing = ["popup", "popup__close-btn"].some((cls) =>
      Array.from(evt.target.classList).includes(cls)
    );
    if (isClosing) {
      setIsOpen(false);
    }
  }

  return { escClose, clickClose };
}

export default usePopupClosing;
