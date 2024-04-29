import React from 'react';

const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div>¿Estás seguro de que deseas eliminar?</div>
      <button onClick={onCancel}>Cancelar</button>
      <button onClick={onConfirm}>Confirmar</button>
    </div>
  );
};

export default ConfirmationDialog;
