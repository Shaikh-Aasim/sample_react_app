import React from 'react';

function UserList({ users, onEditUser, onDeleteUser }) {
  return (
    <ul className="list-group">
      {users.map((user) => (
        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>{user.name} - {user.email} - {user.age}</span>
          <div>
            <button onClick={() => onEditUser(user)} className="btn btn-secondary btn-sm me-2">Edit</button>
            <button onClick={() => onDeleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
