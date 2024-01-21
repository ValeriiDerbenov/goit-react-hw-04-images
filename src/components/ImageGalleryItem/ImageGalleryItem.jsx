import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({item, openModal}) => (

  // const { tags, webformatURL, largeImageURL } = item;

  <>
      <li
      className={css.ImageGalleryItem}
      onClick={e => {
        e.preventDefault();
        openModal(item.largeImageURL, item.tags);
      }}
    >
      <img  className={css.imageGalleryItemImg} src={item.webformatURL} alt={item.tags} loading="lazy" />
    </li>
  </>
);


