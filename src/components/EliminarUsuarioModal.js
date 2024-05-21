import React from 'react';
import './EliminarUsuarioModal.scss';

const EliminarUsuarioModal = ({ user, onClose, onDelete }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <h2>Eliminar Usuario</h2>
          <p>¿Está seguro de que desea eliminar el usuario seleccionado {user.usuario}?</p>
          <div className="modal-buttons">
            <button type="button" onClick={onDelete}>Aceptar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliminarUsuarioModal;
