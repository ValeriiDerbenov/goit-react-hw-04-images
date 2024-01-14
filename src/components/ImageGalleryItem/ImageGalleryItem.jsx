import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, smallUrl, tags, onClickImageItem }) => (
  <div
    className={css.ImageGalleryItem}
    key={id}
    data-id={id}
    onClick={onClickImageItem}
  >
    <img
      className={css.imageGalleryItemImg}
      src={smallUrl}
      alt={tags}
      data-id={id}
    />
  </div>
);