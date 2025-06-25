import React from 'react';
import dayjs from 'dayjs';

const EventsList = ({ events }) => {
  const now = new Date();

  // Filter for events in the current month and sort them
  const monthlyEvents = events
    .filter(ev => {
      const eventDate = new Date(ev.date);
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
        Events for {dayjs().format('MMMM YYYY')}
      </h2>
      {monthlyEvents.length > 0 ? (
        <ul className="space-y-4">
          {monthlyEvents.map(event => (
            <li key={event.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/70 shadow-sm border">
              <div className="w-1.5 h-16 rounded-full" style={{ backgroundColor: event.color || '#3B82F6' }}></div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-4">
                  <span>{dayjs(event.date).format('dddd, MMMM D')}</span>
                  <span>{event.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-10">No events scheduled for this month.</p>
      )}
    </div>
  );
};

export default EventsList;