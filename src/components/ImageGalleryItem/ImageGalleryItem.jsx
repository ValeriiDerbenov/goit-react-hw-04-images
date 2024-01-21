import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, smallUrl, tags, onClickImageItem }) => (
  <div
    className={css.imageGalleryItem}
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

export { ImageGalleryItem };
