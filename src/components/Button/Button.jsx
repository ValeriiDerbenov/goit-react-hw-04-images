import css from './Button.module.css';

export const Button = ({ loadMorePhoto }) => (
  <div className={css.buttonContainer}>
    <button className={css.button} type="button" onClick={loadMorePhoto}>
      Load more
    </button>
  </div>
);