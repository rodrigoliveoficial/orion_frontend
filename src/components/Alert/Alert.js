import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

class Alert extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string,
    btnCloseText: PropTypes.string,
    btnConfirmShow: PropTypes.bool,
    btnSaveText: PropTypes.string,
    autoFocus: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func
  };

  static defaultProps = {
    title: 'Messagem de Alerta',
    btnCloseText: 'Fechar',
    btnConfirmShow: false,
    btnSaveText: 'Salvar',
    autoFocus: false,
    onClose: () => {},
    onSave: () => {}
  };

  state = {
    show: false
  };

  componentDidMount() {
    this.handleOnOpen();
  }

  handleOnClose = (func) => {
    if (func instanceof Function) {
      func();
    }
    this.setState({ show: false });
  }

  handleOnOpen = () => {
    this.setState({ show: true });
  }

  render() {
    const alertRender = (
      <div className="ps-modal-alert-backdrop">
        <div className="static-modal">
          <Modal.Dialog
            className="ps-modal-alert-dialog"
          >
            <Modal.Header
              className="ps-modal-alert-dialog-header"
            >
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="ps-modal-alert-dialog-content"
            >
              <p className="text">{this.props.message}</p>
            </Modal.Body>
            <Modal.Footer
              className="ps-modal-alert-dialog-footer"
            >
              <Button
                variant="default"
                onClick={() => this.handleOnClose(this.props.onClose)}
              >
                {this.props.btnCloseText}
              </Button>
              {this.props.btnConfirmShow
                && (
                <Button
                  variant="default"
                  className="left"
                  onClick={this.props.onSave}
                  active={this.props.autoFocus}
                  autoFocus={this.props.autoFocus}
                >
                  {this.props.btnSaveText}
                </Button>
                )
              }
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    );
    return (
      this.state.show ? alertRender : null
    );
  }
}

export default Alert;
