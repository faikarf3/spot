import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ image, title, description }) => (
	<div className="bg-white rounded-lg overflow-hidden shadow-md">
		{/* Replace with your image path */}
		<img src={image} alt={title} className="w-full h-48 object-cover" />
		<div className="p-4">
			<h3 className="font-bold text-lg text-brand-text-primary">{title}</h3>
			<p className="text-sm text-brand-text-secondary">{description}</p>
		</div>
	</div>
);

const Home = () => {
	const featuredEvents = [
		{
			// Replace with your image path
			image: 'https://placehold.co/400x300/a2a2a2/white?text=Art+Exhibition',
			title: 'Art Exhibition at the Gallery',
			description: 'Explore contemporary art from local artists.',
		},
		{
			// Replace with your image path
			image: 'https://placehold.co/400x300/333333/white?text=Live+Music',
			title: 'Live Music at the Underground',
			description: 'Experience the best indie bands in the city.',
		},
		{
			// Replace with your image path
			image: 'https://placehold.co/400x300/d4ede6/white?text=Bistro+Opening',
			title: 'Grand Opening of The Bistro',
			description: 'Be the first to taste the new culinary delights.',
		},
	];

	return (
		<>
			{/* Hero Section */}
			<div
				className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white text-center px-4 bg-cover bg-center"
				// Replace with your NYC skyline image path
				style={{
					backgroundImage:
						"url('https://placehold.co/1920x1080/333/fff?text=NYC+Skyline')",
				}}
			>
				<div className="absolute inset-0 bg-black/40"></div>
				<div className="relative z-10">
					<h1 className="text-5xl font-bold mb-4">Discover the best of NYC</h1>
					<p className="max-w-xl mx-auto mb-8">
						Find exclusive events and openings in the city that never sleeps.
						Sign up or log in to explore.
					</p>
					<div className="space-x-4">
						<Link
							to="/login"
							className="bg-brand-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-500 transition-colors"
						>
							Log In
						</Link>
						<Link
							to="/signup"
							className="bg-brand-secondary text-brand-text-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-200 transition-colors"
						>
							Sign Up
						</Link>
					</div>
				</div>
			</div>

			{/* Featured Events Section */}
			<div className="container mx-auto px-4 py-16">
				<h2 className="text-3xl font-bold text-center text-brand-text-primary mb-12">
					Featured Events
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{featuredEvents.map((event, index) => (
						<EventCard key={index} {...event} />
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
