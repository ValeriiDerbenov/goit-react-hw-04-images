import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { loadPhotoError, searchPhoto } from './api/api';
import css from './App.module.css';
import { Notify } from "notiflix";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";

export const paramsForNotify = {
  position: 'center-center',
  timeout: 4000,
  width: '600px',
  fontSize: '30px',
};
const perPage = 12;

export class App extends Component {
  state = { 
    search: '',
    photos: [],
    page: 1,
    loading: false,
    btnLoadMore: false,
    showModal: false,
    selectedPhoto: null
    } 

  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search || prevState.page !== this.state.page) { this.addPhotoPage(this.state.search, this.state.page); }
  }
  
  addPhotoPage = (search, page) => {
    this.setState({ loading: true });

    searchPhoto(search, page, perPage)
      .then(data => {
        const { totalHits } = data;
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (totalHits === 0) {
          return Notify.info(
            'There are no images matching your search query. Please try again',
            paramsForNotify
          );
        }

        const arrPhotos = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState(prevState => ({
          photos: [...prevState.photos, ...arrPhotos],
        }));

        if (totalPage > page) {
          this.setState({ btnLoadMore: true });
        } else {
          Notify.info(
            "You've reached the end of search results",
            paramsForNotify
          );
          this.setState({ btnLoadMore: false });
        }
      })
      .catch(loadPhotoError)
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  loadMorePhoto = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickOpenModal = event => {
    const { photos } = this.state;
    const imageId = event.target.getAttribute('data-id');
    const selectedPhoto = photos.find(photo => photo.id === Number(imageId));
    this.setState({ selectedPhoto });

    this.toggleModal();
  };

  onSubmitSearchBar = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchValue = form.search.value
      .trim()
      .toLowerCase()
      .split(' ')
      .join('+');

    if (searchValue === '') {
      Notify.info('Enter your request, please!', paramsForNotify);
      return;
    }

    if (searchValue === this.state.search) {
      Notify.info('Enter new request, please!', paramsForNotify);
      return;
    }

    this.setState({
      search: searchValue,
      page: 1,
      photos: [],
    });
  };

  render() { 
    return (
    <div>
      <Searchbar onSubmitSearchBar={this.onSubmitSearchBar} />
      {this.state.loading && <Loader />}
      <div className={css.container}>
          <ImageGallery
            photos={this.state.photos}
            onClickImageItem={this.onClickOpenModal}
          />
        </div>
        {this.state.photos.length !== 0 && this.state.btnLoadMore && (
          <Button loadMorePhoto={this.loadMorePhoto} />
        )}
        {this.state.showModal && (
          <Modal selectedPhoto={this.state.selectedPhoto} onClose={this.toggleModal} />
        )}
    </div>

    );
  }
}