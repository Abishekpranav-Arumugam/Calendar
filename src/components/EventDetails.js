import React from 'react';
import dayjs from 'dayjs';

const EventDetails = ({ selectedEvent, setSelectedEvent }) => {
  if (!selectedEvent) return null;
  return (
    <div className="mb-4 sm:mb-8 p-4 sm:p-6 rounded-xl border border-gray-200 bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl" style={{ backgroundColor: selectedEvent.color }}></div>
      <div className="flex-1 pl-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="uppercase text-xs font-semibold text-green-600 tracking-wider">Event</span>
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-2">{selectedEvent.title}</div>
        <div className="text-gray-600 mb-2">{selectedEvent.description}</div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            {dayjs(selectedEvent.date).format('dddd, MMM D, YYYY')}
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {selectedEvent.time} - {dayjs(`${selectedEvent.date} ${selectedEvent.time}`).add(selectedEvent.duration, 'minute').format('HH:mm')}
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            {selectedEvent.duration} min
          </div>
        </div>
      </div>
      <button
        className="absolute top-4 right-4 px-3 py-1 bg-gray-100 text-gray-700 rounded transition font-semibold shadow hover:bg-red-500 hover:text-white"
        onClick={() => setSelectedEvent(null)}
      >
        Close
      </button>
    </div>
  );
};

export default EventDetails;