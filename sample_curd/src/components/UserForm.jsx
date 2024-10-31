import React, { useState, useEffect } from 'react';

function UserForm({ onAddUser, onUpdateUser, currentUser }) {
  const [user, setUser] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    age: currentUser?.age || ''
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      onUpdateUser(currentUser.id, user);
    } else {
      onAddUser(user);
    }
    setUser({ name: '', email: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-2">
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-2">
        <input type="number" name="age" placeholder="Age" value={user.age} onChange={handleChange} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default UserForm;
