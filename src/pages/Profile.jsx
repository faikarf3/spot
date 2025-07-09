import React, { useEffect, useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';

const settings = [
  { label: 'Account', desc: 'Manage your account details', icon: '👤' },
  { label: 'Notifications', desc: 'Manage your notification preferences', icon: '🔔' },
  { label: 'Payment Methods', desc: 'Manage your payment methods', icon: '💳' },
  { label: 'Privacy', desc: 'Manage your privacy settings', icon: '🛡️' },
  { label: 'Help', desc: 'Get help and support', icon: '❓' },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (localUser && localUser.id) {
      fetch(`https://spots-d5ze.onrender.com/api/users/${localUser.id}`)
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
    <div className="min-h-screen flex">
      <ProfileSidebar user={user} />
      {/* Main Content */}
      <main className="flex-1 px-8 py-10 ml-64">
        <h1 className="text-3xl font-bold mb-1">Profile</h1>
        <div className="text-[#b48b7d] mb-8">Manage your account settings and preferences</div>
        <div className="flex items-center gap-6 mb-10">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <div className="text-xl font-bold">{user ? user.username : 'Sophia Carter'}</div>
            <div className="text-[#b48b7d] font-medium">Joined in 2021</div>
          </div>
        </div>
        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Upcoming</h2>
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/300x180/efe6de/aaa?text=No+upcoming+events"
              alt="No upcoming events"
              className="rounded-xl mb-4"
              style={{ width: 300, height: 180 }}
            />
            <div className="font-semibold text-lg mb-1">No upcoming events</div>
            <div className="text-[#b48b7d]">Explore events and add them to your calendar</div>
          </div>
        </div>
        {/* Past Events */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Past</h2>
          <div className="flex flex-col items-center">
            <img
              src="https://placehold.co/300x180/efe6de/aaa?text=No+past+events"
              alt="No past events"
              className="rounded-xl mb-4"
              style={{ width: 300, height: 180 }}
            />
            <div className="font-semibold text-lg mb-1">No past events</div>
            <div className="text-[#b48b7d]">Explore events and add them to your calendar</div>
          </div>
        </div>
        {/* Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <div className="flex flex-col gap-4">
            {settings.map(setting => (
              <div key={setting.label} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#f3e9e6] cursor-pointer transition">
                <span className="text-2xl">{setting.icon}</span>
                <div>
                  <div className="font-semibold">{setting.label}</div>
                  <div className="text-[#b48b7d] text-sm">{setting.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="bg-[#f3e9e6] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#e2d1c3] transition">Log Out</button>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
      </main>
    </div>
  );
};

export default Profile; 