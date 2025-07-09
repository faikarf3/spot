import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const SectionTitle = ({ children }) => (
	<h2 className="text-2xl font-bold text-brand-text-primary mb-4 mt-10">
		{children}
	</h2>
);

const FeaturedEvents = ({ events = [], loading = false }) => {
	if (loading) {
		return (
			<section>
				<SectionTitle>Featured Events</SectionTitle>
				<div className="flex gap-6 flex-wrap justify-center">
					<div className="text-center py-8">Loading events...</div>
				</div>
			</section>
		);
	}

	return (
		<section>
			<SectionTitle>Featured Events</SectionTitle>
			<div className="flex gap-6 flex-wrap justify-center">
				{events.map((event, i) => (
					<EventCard
						key={event.eventNumber || i}
						id={event.eventNumber}
						image={
							event.imageUrl
						}
						title={event.eventName || 'Event'}
						description={event.description || 'No description available'}
					/>
				))}
			</div>
		</section>
	);
};

const PopularSpots = () => {
	const spots = [
		{
			id: 'spot-1',
			image: 'https://placehold.co/400x200/fff/222?text=Green+Bean+Cafe',
			title: 'The Green Bean Cafe',
			description: 'Cozy cafe with great coffee',
		},
		{
			id: 'spot-2',
			image: 'https://placehold.co/400x200/aaa/fff?text=City+Museum',
			title: 'City Museum of Art',
			description: 'Explore world-class art collections',
		},
		{
			id: 'spot-3',
			image: 'https://placehold.co/400x200/7fc/fff?text=Riverside+Park',
			title: 'Riverside Park',
			description: 'Enjoy scenic views and walking trails',
		},
		{
			id: 'spot-4',
			image: 'https://placehold.co/400x200/222/fff?text=Jazz+Corner',
			title: 'The Jazz Corner',
			description: 'Live jazz performances nightly',
		},
	];
	return (
		<section>
			<SectionTitle>Popular Spots</SectionTitle>
			<div className="flex gap-6 flex-wrap justify-center">
				{spots.map((s, i) => (
					<EventCard key={s.id} {...s} />
				))}
			</div>
		</section>
	);
};

const RecommendedForYou = () => {
	const recs = [
		{
			id: 'rec-1',
			image: 'https://placehold.co/400x200/000/fff?text=Film+Screening',
			title: 'Indie Film Screening',
			description: 'Discover independent cinema',
		},
		{
			id: 'rec-2',
			image: 'https://placehold.co/400x200/654/fff?text=Craft+Beer',
			title: 'Craft Beer Tasting',
			description: 'Sample local craft brews',
		},
		{
			id: 'rec-3',
			image: 'https://placehold.co/400x200/ccc/222?text=Yoga',
			title: 'Yoga in the Park',
			description: 'Relax with outdoor yoga',
		},
		{
			id: 'rec-4',
			image: 'https://placehold.co/400x200/222/fff?text=Book+Club',
			title: 'Book Club Meeting',
			description: 'Discuss your favorite books',
		},
	];
	return (
		<section>
			<SectionTitle>Recommended for You</SectionTitle>
			<div className="flex gap-6 flex-wrap justify-center">
				{recs.map((r, i) => (
					<EventCard key={r.id} {...r} />
				))}
			</div>
		</section>
	);
};

const Dashboard = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchEvents = async (limit = 3) => {
			setLoading(true);
			try {
				const response = await fetch('https://spots-d5ze.onrender.com/getData');
				const data = await response.json();
				if (data.success) {
					setEvents(data.data.slice(0, limit));
				}
			} catch (error) {
				console.error('Error fetching events:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []); // Fetch once when component mounts

	return (
		<div className="bg-[#f9f6f5] min-h-screen flex flex-col">
			<Nav />
			<div className="container mx-auto px-4 pt-28 flex-1 pb-24">
				<div className="mb-8">
					<input
						type="text"
						placeholder="Search for events or places..."
						className="w-full max-w-xl mx-auto block rounded-md border border-gray-300 px-4 py-3 text-brand-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
					/>
				</div>
				<FeaturedEvents events={events} loading={loading} />
				<PopularSpots />
				<RecommendedForYou />
			</div>
			<Footer />
		</div>
	);
};

export default Dashboard;
