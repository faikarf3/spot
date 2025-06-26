import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-brand-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-brand-text-primary">
            Spots
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/explore"
              className="text-brand-text-primary hover:text-brand-text-secondary transition-colors"
            >
              Explore
            </Link>
            <Link
              to="/foryou"
              className="text-brand-text-primary hover:text-brand-text-secondary transition-colors"
            >
              For You
            </Link>
            <Link
              to="/saved"
              className="text-brand-text-primary hover:text-brand-text-secondary transition-colors"
            >
              Saved
            </Link>
            <Link
              to="/tickets"
              className="text-brand-text-primary hover:text-brand-text-secondary transition-colors"
            >
              Tickets
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 