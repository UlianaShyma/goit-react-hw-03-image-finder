import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItems,
  ImageGalleryItemImg,
  ImgInModal,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }).isRequired,
  };
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      item: { webformatURL, largeImageURL },
    } = this.props;
    const { isModalOpen } = this.state;

    return (
      <ImageGalleryItems>
        <ImageGalleryItemImg src={webformatURL} onClick={this.openModal} />
        {isModalOpen && (
          <Modal onClose={this.onCloseModal} isModalOpen={isModalOpen}>
            <ImgInModal src={largeImageURL} />
          </Modal>
        )}
      </ImageGalleryItems>
    );
  }
}
