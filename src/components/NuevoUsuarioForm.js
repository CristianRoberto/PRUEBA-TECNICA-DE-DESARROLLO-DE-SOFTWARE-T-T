import React, { useState } from 'react';
import './NuevoUsuarioForm.scss';
import axios from 'axios'; // Importa Axios

const NuevoUsuarioForm = ({ onClose }) => {
  const [usuario, setUsuario] = useState('');
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [idDepartamento, setIdDepartamento] = useState('');
  const [idCargo, setIdCargo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Construye el objeto de datos a enviar
      const userData = {
        usuario,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        idDepartamento,
        idCargo
      };

      // Realiza la solicitud POST a la API
      const response = await axios.post('https://localhost:7147/api/User/GuardarUsuario', userData);

      // Si la solicitud es exitosa, muestra un mensaje de éxito y cierra el formulario
      console.log('Usuario creado exitosamente:', response.data);
      onClose();
    } catch (error) {
      // Si hay un error en la solicitud, muestra el mensaje de error en la consola
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="banner d-flex align-items-center justify-content-between">
            <h2>Crear Nuevo Usuario</h2>
            <button type="button" onClick={onClose}>
              <i className="bi bi-x-circle"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-column">
              <label htmlFor="idDepartamento"> Departamento:</label>
              <input type="text" id="idDepartamento" value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)} />
              <label htmlFor="usuario">Usuario:</label>
              <input type="text" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
              <label htmlFor="primerNombre">Primer Nombre:</label>
              <input type="text" id="primerNombre" value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} />
              <label htmlFor="primerApellido">Primer Apellido:</label>
              <input type="text" id="primerApellido" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />

            </div>
            <div className="form-column">
              <label htmlFor="idCargo">Cargo:</label>
              <input type="text" id="idCargo" value={idCargo} onChange={(e) => setIdCargo(e.target.value)} />

              <label htmlFor="segundoNombre">Segundo Nombre:</label>
              <input type="text" id="segundoNombre" value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} />

              <label htmlFor="segundoApellido">Segundo Apellido:</label>
              <input type="text" id="segundoApellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
            </div>
            <div className="modal-buttons">
              <button type="submit">
                <i className="bi bi-save"></i> Guardar Nuevo Usuario
              </button>
              <button type="button" onClick={onClose}>
                <i className="bi bi-x-circle"></i> Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevoUsuarioForm;
