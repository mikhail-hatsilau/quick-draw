import React, { PropTypes } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  getChildContext() {
    return {
      close: this.close,
    };
  }
  close() {
    this.props.closeModal();
  }
  render() {
    return (
      <div className="layer">
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.array,
  closeModal: PropTypes.func,
};

Modal.childContextTypes = {
  close: PropTypes.func,
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
