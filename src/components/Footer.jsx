import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="bg-brand-background py-8">
			<div className="container mx-auto px-4 text-center text-brand-text-secondary">
				<div className="flex justify-center space-x-8 mb-4">
					<Link to="/terms" className="hover:text-brand-text-primary">
						Terms of Service
					</Link>
					<Link to="/privacy" className="hover:text-brand-text-primary">
						Privacy Policy
					</Link>
				</div>
				<p>&copy;2024 Spots. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
