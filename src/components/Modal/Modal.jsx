import { useEffect } from 'react';
import css from './Modal.module.css';

// const modalRoot = document.querySelector('#modal-root');

export const Modal = ({selectedPhoto, onClose}) => {
  const {largeImageURL, tag} = selectedPhoto;
  console.log(selectedPhoto);

  useEffect(() => {
    // клавіша Escape
    const onEscapeCloseModal = (event) => {
        if (event.code === 'Escape') {
        onClose();
        }
    };
    window.addEventListener('keydown', onEscapeCloseModal);

    return () => window.removeEventListener('keydown', onEscapeCloseModal);
    }, [onClose]);
  
  const onClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
        onClose()
    };
}

    return (
      <div className={css.overlay} onClick={onClickOverlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tag} />
        </div>
      </div>
    );
}

