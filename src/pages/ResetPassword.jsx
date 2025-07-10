
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Base URL for API calls, must be set in Vite env: VITE_API_BASE
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    console.log('Reset token:', token, 'API_BASE:', API_BASE);
    if (!API_BASE) {
      setError('Configuration error: API_BASE not defined');
    }
  }, [token, API_BASE]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!API_BASE) return;

    const url = `${API_BASE}/api/reset-password/${token}`;
    console.log('Sending reset request to:', url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setSuccess(data.message || 'Password reset successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || `Reset failed (status ${response.status}).`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Set New Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-brand-primary text-white font-medium rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/login" className="text-indigo-600 hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}
