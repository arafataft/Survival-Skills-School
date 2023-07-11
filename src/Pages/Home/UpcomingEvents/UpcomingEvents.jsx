import './UpcomingEvents.css'
const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Survival Skills Workshop',
      date: 'August 15, 2023',
      location: 'Outdoor Campground',
    },
    {
      id: 2,
      title: 'Wilderness Navigation Training',
      date: 'September 5, 2023',
      location: 'Mountain Range',
    },
    {
        id: 3,
        title: 'Fire Building Masterclass',
        date: 'October 12, 2023',
        location: 'Forest Reserve',
      },
      {
        id: 4,
        title: 'Edible Plant Identification Course',
        date: 'November 8, 2023',
        location: 'Botanical Garden',
      },
      {
        id: 5,
        title: 'First Aid for Outdoor Enthusiasts',
        date: 'December 3, 2023',
        location: 'Community Center',
      }
  ];

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      <div className="event-list">
        {events.map(event => (
          <div key={event.id} className="event">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{event.date}</p>
            <p className="event-location">{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
