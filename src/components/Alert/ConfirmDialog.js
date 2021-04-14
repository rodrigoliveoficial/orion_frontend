import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';

const ConfirmDialog = (props) => {
  return (
    <Dialog
      title={props.title}
      content={props.content}
      onCancel={props.handleCancel}
      onConfirm={props.handleConfirm}
      confirmButtonVariant="outline-success"
      buttonLabel="Confirmar"
      desabledButtons={props.desabledButtons}
      showSpinner={props.showSpinner}
    />
  );
};

ConfirmDialog.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  desabledButtons: PropTypes.bool,
  showSpinner: PropTypes.bool,  
};

ConfirmDialog.defaultProps = {
  title: 'Confirmar',
  content: 'Essa operação não pode ser desfeita',
  desabledButtons: false,
  showSpinner: false
};

export default ConfirmDialog;
