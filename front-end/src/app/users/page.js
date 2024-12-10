"use client";

import { useEffect, useState } from 'react';
import { fetchUsers } from '../../../lib/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Kullanıcıları getirirken bir hata oluştu.');
      }
    };

    getUsers();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      {users.length === 0 ? (
        <p>Henüz kullanıcı yok.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.nameSurname} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
