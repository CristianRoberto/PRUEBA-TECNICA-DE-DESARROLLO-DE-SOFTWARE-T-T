import React, { useState } from 'react';
import './EditarUsuarioModal.scss';

const EditarUsuarioModal = ({ user, onClose, onUpdate }) => {
  const [usuario, setUsuario] = useState(user.usuario);
  const [primerNombre, setPrimerNombre] = useState(user.primerNombre);
  const [segundoNombre, setSegundoNombre] = useState(user.segundoNombre);
  const [primerApellido, setPrimerApellido] = useState(user.primerApellido);
  const [segundoApellido, setSegundoApellido] = useState(user.segundoApellido);
  const [iddepartamento, setDepartamento] = useState(user.idDepartamento);
  const [idcargo, setCargo] = useState(user.idCargo);

  const handleUpdate = () => {
    const updatedUser = {
      ...user,
      usuario,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      iddepartamento,
      idcargo,
    };
    onUpdate(updatedUser);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="banner d-flex align-items-center justify-content-between">
            <h2>Editar Usuario</h2>
            <button type="button" onClick={onClose}>
              <i className="bi bi-x-circle"></i>
            </button>
          </div>

          <form>
            <div className="form-column">
              <label htmlFor="usuario">Usuario:</label>
              <input type="text" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
              <label htmlFor="primerNombre">Primer Nombre:</label>
              <input type="text" id="primerNombre" value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} />
              <label htmlFor="segundoNombre">Segundo Nombre:</label>
              <input type="text" id="segundoNombre" value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} />
            </div>
            <div className="form-column">
              <label htmlFor="primerApellido">Primer Apellido:</label>
              <input type="text" id="primerApellido" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
              <label htmlFor="segundoApellido">Segundo Apellido:</label>
              <input type="text" id="segundoApellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
              <label htmlFor="departamento">Departamento:</label>
              <input type="text" id="iddepartamento" value={iddepartamento} onChange={(e) => setDepartamento(e.target.value)} />
              <label htmlFor="cargo">Cargo:</label>
              <input type="text" id="idcargo" value={idcargo} onChange={(e) => setCargo(e.target.value)} />
            </div>
            <div className="modal-buttons">
              <button type="button" onClick={handleUpdate}>
                <i className="bi bi-pencil-fill"></i> Actualizar
              </button>
              <button type="button" onClick={onClose}>
                <i className="bi bi-x-lg"></i> Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuarioModal;
