import css from './Button.module.css';

const Button = ({ onClickRender }) => (
  <div className={css.buttonContainer}>
    <button className={css.button} type="button" onClick={onClickRender}>
      Load more
    </button>
  </div>
);

export { Button };
