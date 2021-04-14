import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner'
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
              disabled={props.desabledButtons}
            >
              Cancelar
            </Button>
            <Button
              variant={props.confirmButtonVariant}
              className="left"
              onClick={props.onConfirm}
              disabled={props.desabledButtons}
            >

              {props.showSpinner ?
                <Spinner
                  show="false"
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> : ''}

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
  content: PropTypes.string,
  desabledButtons: PropTypes.bool,
  showSpinner: PropTypes.bool
};

Dialog.defaultProps = {
  title: 'Deletar',
  content: 'Essa operação não pode ser desfeita',
  confirmButtonVariant: 'outline-success',
  desabledButtons: false,
  showSpinner: false
};

export default Dialog;
