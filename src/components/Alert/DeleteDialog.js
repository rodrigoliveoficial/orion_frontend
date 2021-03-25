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
    />
  );
};

DeleteDialog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string
};

DeleteDialog.defaultProps = {
  title: 'Deletar',
  content: 'Essa operação não pode ser desfeita'
};

export default DeleteDialog;
