import React from 'react';
import { useParams } from 'react-router-dom';

const Event = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto px-4 pt-32">
      <h1 className="text-3xl font-bold mb-4">Event Details</h1>
      <p>Event ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</span></p>
      {/* You can fetch and display more event details here using the id */}
    </div>
  );
};

export default Event; 