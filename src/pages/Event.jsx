import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Event = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchEventDetails = async () => {
			try {
				setLoading(true);
				const response = await fetch('http://localhost:3001/getData');
				const data = await response.json();

				if (data.success && data.data) {
					// Find the specific event by ID or index
					const foundEvent = data.data.find(
						(e, index) => e.eventNumber === id || index.toString() === id
					);

					if (foundEvent) {
						setEvent(foundEvent);
					} else {
						setError('Event not found');
					}
				} else {
					setError('Failed to fetch event data');
				}
			} catch (err) {
				setError('Error loading event details');
				console.error('Error fetching event:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchEventDetails();
	}, [id]);

	if (loading) {
		return (
			<div className="bg-[#f9f6f5] min-h-screen flex flex-col">
				<Nav />
				<div className="container mx-auto px-4 pt-32 flex-1 pb-24">
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
						<p className="mt-4 text-gray-600">Loading event details...</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	if (error || !event) {
		return (
			<div className="bg-[#f9f6f5] min-h-screen flex flex-col">
				<Nav />
				<div className="container mx-auto px-4 pt-32 flex-1 pb-24">
					<div className="text-center py-12">
						<h1 className="text-3xl font-bold text-red-600 mb-4">
							Event Not Found
						</h1>
						<p className="text-gray-600 mb-6">
							{error || "The event you're looking for doesn't exist."}
						</p>
						<button
							onClick={() => navigate('/')}
							className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary-dark transition-colors"
						>
							Back to Dashboard
						</button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="bg-[#f9f6f5] min-h-screen flex flex-col">
			<Nav />
			<div className="container mx-auto px-4 pt-32 flex-1 pb-24">
				{/* Back Button */}
				<button
					onClick={() => navigate('/')}
					className="mb-6 flex items-center text-brand-primary hover:text-brand-primary-dark transition-colors"
				>
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Back to Dashboard
				</button>

				{/* Event Header */}
				<div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
					{/* Event Image */}
					<div className="relative h-64 md:h-96 bg-gray-200">
						{event.imageUrl ? (
							<img
								src={event.imageUrl}
								alt={event.eventName}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.target.src =
										'https://placehold.co/800x400/fff/222?text=Event+Image';
								}}
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-brand-primary to-brand-primary-dark">
								<span className="text-white text-2xl font-bold">
									Event Image
								</span>
							</div>
						)}
					</div>

					{/* Event Info */}
					<div className="p-6 md:p-8">
						<div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
							<div className="flex-1">
								<h1 className="text-3xl md:text-4xl font-bold text-brand-text-primary mb-4">
									{event.eventName || 'Event Details'}
								</h1>
								{event.caption && (
									<p className="text-gray-600 italic mb-4">"{event.caption}"</p>
								)}
							</div>
							<div className="mt-4 md:mt-0 md:ml-6">
								<div className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
									Event #{event.eventNumber || 'N/A'}
								</div>
							</div>
						</div>

						{/* Event Description */}
						<div className="mb-6">
							<h2 className="text-xl font-semibold text-brand-text-primary mb-3">
								About This Event
							</h2>
							<p className="text-gray-700 leading-relaxed">
								{event.description ||
									'No description available for this event.'}
							</p>
						</div>

						{/* Event Details Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div className="bg-gray-50 p-4 rounded-lg">
								<h3 className="font-semibold text-brand-text-primary mb-2">
									Event Information
								</h3>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600">Event Name:</span>
										<span className="font-medium">
											{event.eventName || 'N/A'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Event ID:</span>
										<span className="font-mono text-sm">
											{event.eventNumber || id}
										</span>
									</div>
									{event.ticketLink && (
										<div className="flex justify-between">
											<span className="text-gray-600">Ticket Link:</span>
											<a
												href={event.ticketLink}
												target="_blank"
												rel="noopener noreferrer"
												className="text-brand-primary hover:underline"
											>
												View Tickets
											</a>
										</div>
									)}
								</div>
							</div>

							<div className="bg-gray-50 p-4 rounded-lg">
								<h3 className="font-semibold text-brand-text-primary mb-2">
									Quick Actions
								</h3>
								<div className="space-y-3">
									{event.ticketLink && (
										<a
											href={event.ticketLink}
											target="_blank"
											rel="noopener noreferrer"
											className="block w-full bg-brand-primary text-white text-center py-2 px-4 rounded-lg hover:bg-brand-primary-dark transition-colors"
										>
											Get Tickets
										</a>
									)}
									<button className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
										Share Event
									</button>
									<button className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
										Add to Calendar
									</button>
								</div>
							</div>
						</div>

						{/* Additional Info */}
						{event.description && event.description.length > 200 && (
							<div className="border-t pt-6">
								<h2 className="text-xl font-semibold text-brand-text-primary mb-3">
									Full Description
								</h2>
								<p className="text-gray-700 leading-relaxed">
									{event.description}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Related Events Section */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-bold text-brand-text-primary mb-4">
						You Might Also Like
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-gray-50 p-4 rounded-lg">
							<div className="h-32 bg-gray-200 rounded mb-3"></div>
							<h3 className="font-semibold text-brand-text-primary">
								Similar Event 1
							</h3>
							<p className="text-gray-600 text-sm">
								Check out this related event
							</p>
						</div>
						<div className="bg-gray-50 p-4 rounded-lg">
							<div className="h-32 bg-gray-200 rounded mb-3"></div>
							<h3 className="font-semibold text-brand-text-primary">
								Similar Event 2
							</h3>
							<p className="text-gray-600 text-sm">Another great option</p>
						</div>
						<div className="bg-gray-50 p-4 rounded-lg">
							<div className="h-32 bg-gray-200 rounded mb-3"></div>
							<h3 className="font-semibold text-brand-text-primary">
								Similar Event 3
							</h3>
							<p className="text-gray-600 text-sm">Don't miss this one</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Event;
