import React from 'react';
import dayjs from 'dayjs';

const EventModal = ({ modalEvents, modalDay, setModalEvents, setSelectedEvent, handleDeleteEvent }) => {
  if (!modalEvents) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
          onClick={() => setModalEvents(null)}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="mb-2 font-bold text-lg text-center">
          Events on {modalDay && dayjs(modalDay).format('MMMM D, YYYY')}
        </div>
        <div className="space-y-2">
          {modalEvents.map(event => (
            <div
              key={event.title + event.time}
              className="flex items-center bg-gray-50 border-l-4 rounded p-2 cursor-pointer hover:bg-blue-50 transition relative"
              style={{ borderColor: event.color }}
              onClick={() => {
                setSelectedEvent(event);
                setModalEvents(null);
              }}
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-xs truncate">{event.title}</div>
                <div className="text-[11px] text-gray-500">
                  {event.time} - {event.end.format('HH:mm')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventModal;