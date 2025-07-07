import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (localUser && localUser.id) {
      fetch(`http://localhost:3001/api/users/${localUser.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setUser(data.user);
          else setError(data.message || 'Failed to fetch user.');
        })
        .catch(() => setError('Failed to fetch user.'));
    } else {
      setError('No user information found. Please log in.');
    }
  }, []);

  return (
    <div className="container mx-auto px-4 pt-32">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {error && <p>{error}</p>}
      {user && (
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          <p className="mb-2"><span className="font-semibold">Name:</span> {user.username}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile; 