import React from 'react';

function About() {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-6">About Spot</h1>
				<p className="text-lg text-gray-600 mb-8">
					This is the about page for our Spot project. Here you can learn more
					about what we're building.
				</p>
				<a
					href="/"
					className="bg-brand-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-500 transition-colors"
				>
					Back to Home
				</a>
			</div>
		</div>
	);
}

export default About;
