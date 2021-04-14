import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';

const DeleteDialog = (props) => {
  return (
    <Dialog
      title={props.title}
      content={props.content}
      onCancel={props.handleCancel}
      onConfirm={props.handleDelete}
      confirmButtonVariant="outline-danger"
      buttonLabel="Deletar"
      desabledButtons={props.desabledButtons}
      showSpinner={props.showSpinner}
    />
  );
};

DeleteDialog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  desabledButtons: PropTypes.bool,
  showSpinner: PropTypes.bool
};

DeleteDialog.defaultProps = {
  title: 'Deletar',
  content: 'Essa operação não pode ser desfeita',
  desabledButtons: false,
  showSpinner: false
};

export default DeleteDialog;
