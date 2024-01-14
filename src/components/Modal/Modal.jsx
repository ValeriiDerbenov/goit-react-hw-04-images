import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onEscapeCloseModal);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onEscapeCloseModal);
  };

  onEscapeCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClickOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const {
      selectedPhoto: { largeImageURL, tags },
    } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.onClickOverlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

