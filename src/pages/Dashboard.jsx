import React from 'react';
import Nav from '../components/Nav';
import EventCard from '../components/EventCard';

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-brand-text-primary mb-4 mt-10">{children}</h2>
);

const FeaturedEvents = () => {
  const events = [
    {
      image: 'https://placehold.co/400x200/222/fff?text=Live+Music',
      title: 'Live Music Night',
      description: 'Experience the best local bands',
    },
    {
      image: 'https://placehold.co/400x200/eee/222?text=Art+Showcase',
      title: 'Modern Art Showcase',
      description: 'Explore contemporary art',
    },
    {
      image: 'https://placehold.co/400x200/9fc/fff?text=Food+Festival',
      title: 'Taste of the City',
      description: 'Sample diverse cuisines',
    },
    {
      image: 'https://placehold.co/400x200/111/fff?text=Premiere',
      title: 'Broadway Premiere',
      description: 'Catch the latest hit show',
    },
  ];
  return (
    <section>
      <SectionTitle>Featured Events</SectionTitle>
      <div className="flex gap-6 flex-wrap justify-center">
        {events.map((e, i) => <EventCard key={i} {...e} />)}
      </div>
    </section>
  );
};

const PopularSpots = () => {
  const spots = [
    {
      image: 'https://placehold.co/400x200/fff/222?text=Green+Bean+Cafe',
      title: 'The Green Bean Cafe',
      description: 'Cozy cafe with great coffee',
    },
    {
      image: 'https://placehold.co/400x200/aaa/fff?text=City+Museum',
      title: 'City Museum of Art',
      description: 'Explore world-class art collections',
    },
    {
      image: 'https://placehold.co/400x200/7fc/fff?text=Riverside+Park',
      title: 'Riverside Park',
      description: 'Enjoy scenic views and walking trails',
    },
    {
      image: 'https://placehold.co/400x200/222/fff?text=Jazz+Corner',
      title: 'The Jazz Corner',
      description: 'Live jazz performances nightly',
    },
  ];
  return (
    <section>
      <SectionTitle>Popular Spots</SectionTitle>
      <div className="flex gap-6 flex-wrap justify-center">
        {spots.map((s, i) => <EventCard key={i} {...s} />)}
      </div>
    </section>
  );
};

const RecommendedForYou = () => {
  const recs = [
    {
      image: 'https://placehold.co/400x200/000/fff?text=Film+Screening',
      title: 'Indie Film Screening',
      description: 'Discover independent cinema',
    },
    {
      image: 'https://placehold.co/400x200/654/fff?text=Craft+Beer',
      title: 'Craft Beer Tasting',
      description: 'Sample local craft brews',
    },
    {
      image: 'https://placehold.co/400x200/ccc/222?text=Yoga',
      title: 'Yoga in the Park',
      description: 'Relax with outdoor yoga',
    },
    {
      image: 'https://placehold.co/400x200/222/fff?text=Book+Club',
      title: 'Book Club Meeting',
      description: 'Discuss your favorite books',
    },
  ];
  return (
    <section>
      <SectionTitle>Recommended for You</SectionTitle>
      <div className="flex gap-6 flex-wrap justify-center">
        {recs.map((r, i) => <EventCard key={i} {...r} />)}
      </div>
    </section>
  );
};

const UpcomingEvents = () => {
  const events = [
    {
      date: 'Tomorrow',
      title: 'Tech Meetup',
      description: 'Networking event for tech professionals',
      image: 'https://placehold.co/400x200/234/fff?text=Tech+Meetup',
    },
    {
      date: 'Next Week',
      title: 'Food Truck Festival',
      description: 'A variety of food trucks offering diverse cuisines',
      image: 'https://placehold.co/400x200/3a7/fff?text=Food+Truck',
    },
    {
      date: 'In Two Weeks',
      title: 'Outdoor Concert',
      description: 'Live music performance in the park',
      image: 'https://placehold.co/400x200/9cf/fff?text=Outdoor+Concert',
    },
  ];
  return (
    <section>
      <SectionTitle>Upcoming Events</SectionTitle>
      <div className="flex flex-col gap-8 items-center">
        {events.map((e, i) => (
          <EventCard
            key={i}
            {...e}
            date={e.date}
            buttonLabel="View Details"
            layout="horizontal"
          />
        ))}
      </div>
    </section>
  );
};

const Dashboard = () => {
  return (
    <div className="bg-[#f9f6f5] min-h-screen pb-20">
      <Nav />
      <div className="container mx-auto px-4 pt-28">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for events or places..."
            className="w-full max-w-xl mx-auto block rounded-md border border-gray-300 px-4 py-3 text-brand-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <FeaturedEvents />
        <PopularSpots />
        <RecommendedForYou />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Dashboard; 