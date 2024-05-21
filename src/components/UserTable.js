import React, { useState, useEffect } from 'react';
import './UserTable.scss';
import EditarUsuarioModal from './EditarUsuarioModal';
import EliminarUsuarioModal from './EliminarUsuarioModal';
import axios from 'axios';

const UserTable = ({ onUpdateUser, onDeleteUser = () => {} }) => {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('https://localhost:7147/api/User/ListaUsuarios');
        const departmentResponse = await axios.get('https://localhost:7147/api/Departamento/ListaDepartamento');
        const positionResponse = await axios.get('https://localhost:7147/api/Cargo/Lista');

        setData(userResponse.data.$values);
        setDepartments(departmentResponse.data.$values);
        setPositions(positionResponse.data.$values);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const getDepartmentName = (id) => {
    const department = departments.find(dep => dep.id === id);
    return department ? department.nombre : 'Desconocido';
  };

  const getPositionName = (id) => {
    const position = positions.find(pos => pos.id === id);
    return position ? position.nombre : 'Desconocido';
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    onUpdateUser(updatedUser);
    closeEditModal();
  };

  const handleDeleteUser = async () => {
    try {
      console.log(`Eliminando usuario con ID: ${selectedUser.id}`); // Registro adicional
      await axios.delete(`https://localhost:7147/api/User/Eliminar/${selectedUser.id}`);
      setData(data.filter(user => user.id !== selectedUser.id));
      onDeleteUser(selectedUser.id);  // Esta línea se mantiene para propagar la eliminación al componente padre si es necesario
      closeDeleteModal();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className="user-table">
      <table className="user-table__table">
        <thead className="user-table__thead">
          <tr>
            <th>Usuario</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Departamento</th>
            <th>Cargo</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="user-table__tbody">
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.usuario}</td>
              <td>{user.primerNombre}</td>
              <td>{user.segundoNombre}</td>
              <td>{getDepartmentName(user.idDepartamento)}</td>
              <td>{getPositionName(user.idCargo)}</td>
              <td>{user.email}</td>
              <td>
                <button className="user-table__button user-table__button--edit" onClick={() => openEditModal(user)}>
                  <i className="bi bi-pencil-fill"></i>Editar
                </button>
                <button className="user-table__button user-table__button--delete" onClick={() => openDeleteModal(user)}>
                  <i className="bi bi-trash-fill"></i>Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && <EditarUsuarioModal user={selectedUser} onClose={closeEditModal} onUpdate={handleUpdateUser} />}
      {isDeleteModalOpen && <EliminarUsuarioModal user={selectedUser} onClose={closeDeleteModal} onDelete={handleDeleteUser} />}
    </div>
  );
};

export default UserTable;
