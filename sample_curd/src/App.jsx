import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  const addUser = async (user) => {
    await axios.post('http://localhost:5000/users', user);
    fetchUsers();
  };

  const updateUser = async (id, user) => {
    await axios.put(`http://localhost:5000/users/${id}`, user);
    fetchUsers();
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mt-5">
      <h1>User Management</h1>
      <UserForm
        onAddUser={addUser}
        onUpdateUser={updateUser}
        currentUser={editingUser}
      />
      <UserList
        users={users}
        onEditUser={setEditingUser}
        onDeleteUser={deleteUser}
      />
    </div>
  );
}

export default App;
