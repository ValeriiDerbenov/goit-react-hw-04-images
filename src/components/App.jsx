import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto, onFetchError } from './Api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};
const perPage = 12;

export const App = () => {

  const [search, setSearch] = useState('');
  const [photos, setPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if(!search) return;

    const loadImages = async () => {
      setLoading(true);
      try {
        const response = await fetchPhoto(search, page)
        
          const { totalHits, hits } = response;
          const totalPage = Math.ceil(totalHits / perPage);
          if (totalHits === 0) {
            return Notify.info(
              'There are no images matching your search query. Please try again',
              paramsForNotify
            );}

            const arrPhotos = hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              { id, webformatURL, largeImageURL, tags }
            ));
  
          setPhoto(prevState=> [...prevState, ...arrPhotos]); 
  
          if (totalPage > page) {
            setBtnLoadMore(true);
          } else {
            Notify.info(
              "You've reached the end of search results",
              paramsForNotify
            );
            setBtnLoadMore(false);
          }}
      
      catch(error) {
        onFetchError(error)
      }
      finally {
        setLoading(false);
      };  
    };
    
      loadImages();
      setBtnLoadMore(false);
  }, [search, page]);

  const loadMorePhoto = () => {
    setPage(page + 1);
    setLoading(true)  
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const onClickOpenModal = (photo) => {
    setShowModal(true);
    setSelectedPhoto(photo);
  };

 const handleSubmit = (searchValue) => {
  setSearch(searchValue)
  setPage(1)
  setPhoto([]);
};

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}      
      <div className={css.container}>
        <ImageGallery
          photos={photos}
          onClickImageItem={onClickOpenModal}
        />
      </div>
      {photos.length !== 0 && btnLoadMore && (
        <Button onClickRender={loadMorePhoto} />
      )}
      {showModal && <Modal selectedPhoto={selectedPhoto} onClose={toggleModal}>
          </Modal>}
    </div>
  );
}

/*
export class App extends Component {
  state = {
    search: '',
    photos: [],
    page: 1,
    loading: false,
    btnLoadMore: false,
    showModal: false,
    selectedPhoto: null,
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.search;
    const prevPage = prevState.page;
    const newSearch = this.state.search;
    const newPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== newPage) {
      this.addPhotoPage(newSearch, newPage);
    }
  }

  addPhotoPage = (search, page) => {
    this.setState({ loading: true });

    fetchPhoto(search, page, perPage)
      .then(data => {
        const { totalHits } = data;
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (totalHits === 0) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
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
            "We're sorry, but you've reached the end of search results.",
            paramsForNotify
          );
          this.setState({ btnLoadMore: false });
        }
      })
      .catch(onFetchError)
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onClickRender = () => {
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

    // form.reset();
  };

  render() {
    const { loading, photos, btnLoadMore, showModal, selectedPhoto } =
      this.state;

    return (
      <div>
        <Searchbar onSubmitSearchBar={this.onSubmitSearchBar} />
        {loading && <Loader />}      
        <div className={css.container}>
          <ImageGallery
            photos={photos}
            onClickImageItem={this.onClickOpenModal}
          />
        </div>
        {photos.length !== 0 && btnLoadMore && (
          <Button onClickRender={this.onClickRender} />
        )}
        {showModal && (
          <Modal selectedPhoto={selectedPhoto} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}
*/

/*
export const App = () => {
  const [search, setSearch] = useState('');
  const [photos, setPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

 

  useEffect(() => {
    if (!search) {
      return;
    } 

    const addPhotoPage = () => {
      setSearch({ loading: true });
    };
    
    addPhotoPage()
  
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
          setPhoto(prevState => ({
            photos: [...prevState.photos, ...arrPhotos],
          })); 
  
          if (totalPage > page) {
            setBtnLoadMore({ btnLoadMore: true });
          } else {
            Notify.info(
              "You've reached the end of search results",
              paramsForNotify
            );
            setBtnLoadMore({ btnLoadMore: false });
          }
        })
        .catch(loadPhotoError)
        .finally(() => {
          setLoading({ loading: false });
        });
      }, [page, search]);


      const loadMorePhoto = () => {
        setPage(({ page }) => ({ page: page + 1 }));
      };
    
      const toggleModal = () => {
        setShowModal(({ showModal }) => ({
          showModal: !showModal,
        }));
      };
    
      const onClickOpenModal = event => {
        // const { photos } = this.state;
        const imageId = event.target.getAttribute('data-id');
        const selectedPhoto = photos.find(photo => photo.id === Number(imageId));
        setSelectedPhoto({ selectedPhoto });
    
        toggleModal();
      };
    
      const onSubmitSearchBar = event => {
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
    
        if (searchValue === search) {
          Notify.info('Enter new request, please!', paramsForNotify);
          return;
        }
    
        setSearch({
          search: searchValue         
        });
        setPage({
          page: 1
        });
        setPhoto({
          photos: []
        });        
      };
      return (
        <div>
          <Searchbar onSubmitSearchBar={onSubmitSearchBar} />
          {loading && <Loader />}
          <div className={css.container}>
              <ImageGallery
                photos={photos}
                onClickImageItem={onClickOpenModal}
              />
            </div>
            {photos.length !== 0 && btnLoadMore && (
              <Button loadMorePhoto={loadMorePhoto} />
            )}
            {showModal && (
              <Modal selectedPhoto={selectedPhoto} onClose={toggleModal} />
            )}
        </div>
    
        );
*/