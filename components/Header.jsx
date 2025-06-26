import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-10 bg-brand-background/80 backdrop-blur-sm">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					<Link to="/" className="text-xl font-bold text-brand-text-primary">
						Spots
					</Link>
					<nav className="flex items-center space-x-4">
						<Link
							to="/about"
							className="text-brand-text-primary hover:text-brand-text-secondary transition-colors"
						>
							About
						</Link>
						<Link
							to="/contact"
							className="text-brand-text-primary hover:text-brand-text-secondary transition-colors"
						>
							Contact
						</Link>
						<Link
							to="/login"
							className="bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500 transition-colors"
						>
							Log In
						</Link>
						<Link
							to="/signup"
							className="bg-brand-secondary text-brand-text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
						>
							Sign Up
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
