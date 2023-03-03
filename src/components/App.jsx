import { Component } from 'react';
import { ImageGallery } from './ImageGallery/';
import { Searchbar } from './Searchbar/';
import { FetchImages } from './Utils/PiaxabayApi';
import { Loader } from './Loader/';
import { ButtonLoadMore } from './Button/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    items: [],
    error: null,
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits: total } = await FetchImages(query, page);

      if (total === 0) {
        toast.warning(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      if (this.state.page === 1) {
        toast.success(`${total} images found`);
      }

      this.setState(prev => {
        return {
          items: [...prev.items, ...hits],
          total,
        };
      });
    } catch (error) {
      this.setState({ error });
      this.errorMesage(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  errorMesage = message => {
    toast.error(`Oops, something went wrong: ${message}`);
  };

  handleFormSubmit = query => {
    if (query.trim() === '') {
      return;
    }
    this.setState({
      query,
      page: 1,
      items: [],
      error: null,
      isLoading: false,
    });
  };

  render() {
    const { items, isLoading, total, page, query } = this.state;
    const showLoadMore = page < Math.ceil(total / 12);
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery items={items} />
        {query !== '' &&
          items.length !== 0 &&
          isLoading !== true &&
          showLoadMore && (
            <ButtonLoadMore type="button" onClick={this.onLoadMore}>
              Load more
            </ButtonLoadMore>
          )}

        {isLoading && <Loader />}
        <ToastContainer autoClose={2500}></ToastContainer>
      </div>
    );
  }
}
