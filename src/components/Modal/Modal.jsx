import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressEsc);
  }

  handlePressEsc = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    const { children, onClose } = this.props;
    return (
      <>
        <Overlay onClick={onClose}>
          <ModalWindow>{children}</ModalWindow>
        </Overlay>
      </>
    );
  }
}
