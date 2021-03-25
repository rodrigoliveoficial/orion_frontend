import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const Dialog = (props) => {
  return (
    <div className="ps-modal-alert-backdrop">
      <div className="static-modal">
        <Modal.Dialog
          className="ps-modal-alert-dialog"
        >
          <Modal.Header
            className="ps-modal-alert-dialog-header"
          >
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="ps-modal-alert-dialog-content"
          >
            <p className="text">{props.content}</p>
          </Modal.Body>
          <Modal.Footer
            className="ps-modal-alert-dialog-footer"
          >
            <Button
              variant="outline-dark"
              onClick={props.onCancel}
              autoFocus
            >
              Cancelar
            </Button>
            <Button
              variant={props.confirmButtonVariant}
              className="left"
              onClick={props.onConfirm}
            >
              {props.buttonLabel}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  confirmButtonVariant: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string
};

Dialog.defaultProps = {
  title: 'Deletar',
  content: 'Essa operação não pode ser desfeita',
  confirmButtonVariant: 'outline-success'
};

export default Dialog;
