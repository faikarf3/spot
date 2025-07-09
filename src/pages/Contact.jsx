import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Get in touch with us for any questions or feedback about Spot.
        </p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-700">Email: contact@spot.com</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-700">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-brand-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
