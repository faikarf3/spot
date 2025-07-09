import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';

const Create = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState('');

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setPhotoPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data
    console.log({ name, description, location, photos, rating });
    setSuccess('Post created successfully!');
    setName('');
    setDescription('');
    setLocation('');
    setPhotos([]);
    setPhotoPreviews([]);
    setRating(0);
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="min-h-screen flex">
      <ProfileSidebar user={null} />
      <main className="flex-1 px-8 py-12 ml-64 flex justify-center items-start">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Create a Hangout Spot Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow w-full">
            <div>
              <label className="block font-semibold mb-1">Name of Hangout Spot</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={name}
                onChange={e => setName(e.target.value)}
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
              <label className="block font-semibold mb-1">Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <div className="flex gap-4 mt-2 flex-wrap">
                {photoPreviews.map((src, i) => (
                  <img key={i} src={src} alt="Preview" className="w-24 h-24 object-cover rounded-lg border" />
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Rating</label>
              <div className="flex gap-2 items-center">
                {[1,2,3,4,5].map(num => (
                  <label key={num} className="flex flex-col items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      checked={rating === num}
                      onChange={() => setRating(num)}
                      className="hidden"
                    />
                    <span className={`text-2xl ${rating >= num ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">Create Post</button>
            {success && <div className="text-green-600 font-semibold text-center mt-2">{success}</div>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Create; 