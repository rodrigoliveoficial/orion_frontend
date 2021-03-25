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
    />
  );
};

ConfirmDialog.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string
};

ConfirmDialog.defaultProps = {
  title: 'Confirmar',
  content: 'Essa operação não pode ser desfeita'
};

export default ConfirmDialog;
