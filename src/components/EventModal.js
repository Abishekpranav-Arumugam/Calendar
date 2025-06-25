// src/components/EventModal.js
import React from 'react';
import dayjs from 'dayjs';

const EventModal = ({ modalEvents, modalDay, setModalEvents, setSelectedEvent }) => {
  if (!modalEvents || !modalDay) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      // Allow closing the modal by clicking the backdrop
      onClick={() => setModalEvents(null)} 
    >
      {/* Add stopPropagation to prevent the modal from closing when clicking inside it */}
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full relative transform transition-all"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800"
          onClick={() => setModalEvents(null)}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mb-4">
          <h2 className="font-bold text-xl text-gray-800 text-center">
            Events on
          </h2>
          <p className="text-center text-gray-500">
            {dayjs(modalDay).format('dddd, MMMM D, YYYY')}
          </p>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {modalEvents.map(event => {
            // --- ROBUST TIME HANDLING ---
            // This logic prevents the crash by checking for time properties.
            const hasTime = event.startTime;
            let timeString = 'All-day';
            if (hasTime) {
              const start = dayjs(event.startTime);
              const end = event.endTime ? dayjs(event.endTime) : start.add(1, 'hour');
              timeString = `${start.format('HH:mm')} - ${end.format('HH:mm')}`;
            }

            return (
              <div
                key={event.id}
                className="flex items-center bg-gray-50 border-l-4 rounded-md p-3 cursor-pointer hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                style={{ borderColor: event.color || '#6366f1' }}
                onClick={() => {
                  setSelectedEvent(event);
                  setModalEvents(null); // Close this modal and show details
                }}
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{event.title}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    {/* Time Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{timeString}</span>
                  </div>
                </div>
                {/* Chevron icon to indicate it's clickable */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventModal;