// src/components/EventDetails.js
import React from 'react';
import dayjs from 'dayjs';

// Helper icons for the buttons
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);

const EventDetails = ({ selectedEvent, setSelectedEvent, handleDeleteEvent, onEdit }) => {
  if (!selectedEvent) return null;

  const { title, description, date, startTime, endTime, color } = selectedEvent;
  const eventStart = dayjs(startTime || date);
  const eventEnd = dayjs(endTime || eventStart.add(1, 'hour'));
  const isAllDay = !startTime && !endTime;

  return (
    <div className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200/80 flex p-4 mb-4">
      {/* Colored side-bar */}
      <div className="w-1.5 rounded-full mr-4" style={{ backgroundColor: color || '#6366f1' }}></div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-600">EVENT</span>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Close
            </button>
            <button
              onClick={() => handleDeleteEvent(selectedEvent)}
              className="p-2 rounded-md bg-gray-100 text-red-500 hover:bg-red-100"
              aria-label="Delete event"
            >
              <TrashIcon />
            </button>
            <button
              onClick={onEdit}
              className="p-2 rounded-md bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              aria-label="Edit event"
            >
              <PencilIcon />
            </button>
          </div>
        </div>
        
        {description && <p className="text-gray-600">{description}</p>}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-500 pt-2">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{eventStart.format('dddd, MMM D, YYYY')}</span>
          </div>
          {!isAllDay && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{`${eventStart.format('HH:mm')} - ${eventEnd.format('HH:mm')}`}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;