import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const SectionTitle = ({ children }) => (
	<h2 className="text-2xl font-bold text-brand-text-primary mb-4 mt-10">
		{children}
	</h2>
);

const FeaturedEvents = ({ events = [], loading = false, searchTerm = '' }) => {
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

	// Filter events based on search term
	const filteredEvents = events.filter((event) => {
		if (!searchTerm) return true;
		const searchLower = searchTerm.toLowerCase();
		return (
			event.eventName?.toLowerCase().includes(searchLower) ||
			event.description?.toLowerCase().includes(searchLower) ||
			event.caption?.toLowerCase().includes(searchLower)
		);
	});

	if (searchTerm && filteredEvents.length === 0) {
		return (
			<section>
				<SectionTitle>Featured Events</SectionTitle>
				<div className="flex gap-6 flex-wrap justify-center">
					<div className="text-center py-8 text-gray-500">
						No events found matching "{searchTerm}"
					</div>
				</div>
			</section>
		);
	}

	return (
		<section>
			<SectionTitle>Featured Events</SectionTitle>
			<div className="flex gap-6 flex-wrap justify-center">
				{filteredEvents.map((event, i) => (
					<EventCard
						key={event.eventNumber || i}
						id={event.eventNumber}
						image={event.imageUrl}
						title={event.eventName || 'Event'}
						description={event.description || 'No description available'}
					/>
				))}
			</div>
		</section>
	);
};

const PopularSpots = ({ searchTerm = '' }) => {
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

	// Filter spots based on search term
	const filteredSpots = spots.filter((spot) => {
		if (!searchTerm) return true;
		const searchLower = searchTerm.toLowerCase();
		return (
			spot.title.toLowerCase().includes(searchLower) ||
			spot.description.toLowerCase().includes(searchLower)
		);
	});

	if (searchTerm && filteredSpots.length === 0) {
		return (
			<section>
				<SectionTitle>Popular Spots</SectionTitle>
				<div className="flex gap-6 flex-wrap justify-center">
					<div className="text-center py-8 text-gray-500">
						No spots found matching "{searchTerm}"
					</div>
				</div>
			</section>
		);
	}

	return (
		<section>
			<SectionTitle>Popular Spots</SectionTitle>
			<div className="flex gap-6 flex-wrap justify-center">
				{filteredSpots.map((s) => (
					<EventCard key={s.id} {...s} />
				))}
			</div>
		</section>
	);
};

const RecommendedForYou = ({ searchTerm = '' }) => {
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

	// search bar functionality
	const filteredRecs = recs.filter((rec) => {
		if (!searchTerm) return true;
		const searchLower = searchTerm.toLowerCase();
		return (
			rec.title.toLowerCase().includes(searchLower) ||
			rec.description.toLowerCase().includes(searchLower)
		);
	});

	if (searchTerm && filteredRecs.length === 0) {
		return (
			<section>
				<SectionTitle>Recommended for You</SectionTitle>
				<div className="flex gap-6 flex-wrap justify-center">
					<div className="text-center py-8 text-gray-500">
						No recommendations found matching "{searchTerm}"
					</div>
				</div>
			</section>
		);
	}

	return (
		<section>
			<SectionTitle>Recommended for You</SectionTitle>
			<div className="flex gap-6 flex-wrap justify-center">
				{filteredRecs.map((r) => (
					<EventCard key={r.id} {...r} />
				))}
			</div>
		</section>
	);
};

const Dashboard = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchEvents = async (limit = 3) => {
			setLoading(true);
			try {
				const response = await fetch('http://localhost:3001/getData');
				const data = await response.json();
				if (data.success) {
					setEvents(data.data.slice(0, limit));
				}

				console.log(data.data);
			} catch (error) {
				console.error('Error fetching events:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []); // Fetch once when component mounts

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="bg-[#f9f6f5] min-h-screen flex flex-col">
			<Nav />
			<div className="container mx-auto px-4 pt-28 flex-1 pb-24">
				<div className="mb-8">
					<input
						type="text"
						placeholder="Search for events or places..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="w-full max-w-xl mx-auto block rounded-md border border-gray-300 px-4 py-3 text-brand-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
					/>
				</div>
				<FeaturedEvents
					events={events}
					loading={loading}
					searchTerm={searchTerm}
				/>
				<PopularSpots searchTerm={searchTerm} />
				<RecommendedForYou searchTerm={searchTerm} />
			</div>
			<Footer />
		</div>
	);
};

export default Dashboard;
