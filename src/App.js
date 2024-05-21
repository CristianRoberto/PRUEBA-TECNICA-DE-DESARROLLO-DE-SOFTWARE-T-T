import React, { useState } from 'react';

import NuevoUsuarioForm from './components/NuevoUsuarioForm';

import UserTable from './components/UserTable';

import Autor from './components/Autor';
import './App.scss';


const App = () => {
  const [editarModalIsOpen, setEditarModalIsOpen] = useState(false);

  const openEditarModal = () => {
    setEditarModalIsOpen(true);
  };

  const closeEditarModal = () => {
    setEditarModalIsOpen(false);
  };

  const users = [
    {
      usuario: 'jdoe',
      nombres: 'John',
      apellidos: 'Doe',
      departamento: 'Ventas',
      cargo: 'Gerente',
      email: 'jdoe@example.com'
    },
    {
      usuario: 'asmith',
      nombres: 'Anna',
      apellidos: 'Smith',
      departamento: 'Marketing',
      cargo: 'Especialista',
      email: 'asmith@example.com'
    }
  ];
  return (
    <div className="App">
      <p>Modulo de Administración</p>
      <h1>Administración de Usuarios</h1>
      <div className="controls">
        <div className="controls__inputs">
          <select>
            <option value="">Seleccionar Departamento</option>
            <option value="ventas">Ventas</option>
            <option value="marketing">Marketing</option>
          </select>
          <select>
            <option value="">Seleccionar Cargo</option>
            <option value="gerente">Gerente</option>
            <option value="especialista">Especialista</option>
          </select>
        </div>
        <button className="controls__button" onClick={openEditarModal}>Crear Nuevo Usuario</button>
      </div>
      {editarModalIsOpen && <NuevoUsuarioForm onClose={closeEditarModal} />}
    
    
       <UserTable users={users} />
       <Autor />


    
    </div>
  );
};

export default App;
