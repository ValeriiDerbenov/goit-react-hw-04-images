import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ photos, openModal }) => (
  <div className={css.imageGallery}>
    {photos.map(photo => (
        <ImageGalleryItem key={photo.id} item={photo} openModal={openModal} />        
      ))}
  </div>
);

export { ImageGallery };
