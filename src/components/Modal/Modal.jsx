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
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <>
        <Overlay onClick={this.handleBackdropClick}>
          <ModalWindow>{children}</ModalWindow>
        </Overlay>
      </>
    );
  }
}
