import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setStatus('');
    if (password !== confirm) {
      return setError('Passwords do not match.');
    }
    try {
      const res = await fetch(
        `https://spots-d5ze.onrender.com/api/reset-password/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setStatus(data.message);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Set New Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm">New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Confirm Password</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {status && <p className="text-green-600">{status}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link to="/login" className="text-indigo-600 hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}