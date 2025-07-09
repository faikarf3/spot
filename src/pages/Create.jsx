import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';

const Create = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!eventName || !description || !location || !imageURL) {
      setError('All fields are required.');
      return;
    }
    try {
      const res = await fetch('https://spots-d5ze.onrender.com/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, description, location, imageURL })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Post created successfully!');
        setEventName('');
        setDescription('');
        setLocation('');
        setImageURL('');
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(data.message || 'Failed to create post.');
      }
    } catch {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <ProfileSidebar user={null} />
      <main className="flex-1 px-8 py-12 ml-64 flex justify-center items-start">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Create a Hangout Spot Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow w-full">
            <div>
              <label className="block font-semibold mb-1">Event Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Central Park, NYC"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={imageURL}
                onChange={e => setImageURL(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">Create Post</button>
            {success && <div className="text-green-600 font-semibold text-center mt-2">{success}</div>}
            {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Create; 