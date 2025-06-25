// src/components/CalendarDayCell.js
import React from 'react';
import dayjs from 'dayjs';

const CalendarDayCell = ({ day, currentDate, today, events, handleSelectEvent, setModalEvents, setModalDay }) => {
  const isCurrentMonth = day.isSame(currentDate, 'month');
  const isToday = day.isSame(today, 'day');
  const dayEvents = events.filter(e => dayjs(e.date).isSame(day, 'day'));
  const MAX_EVENTS_VISIBLE = 1;

  return (
    <div
      // <-- UPDATED: Added dark mode classes
      className={`relative flex flex-col bg-white dark:bg-gray-800/80 rounded-lg shadow-sm  
      h-24 md:h-28 lg:h-32 
      transition-all duration-300
      hover:scale-105 hover:shadow-2xl dark:hover:shadow-gray-900/60 hover:z-20 
      p-1 sm:p-2`}
    >
      <div
        className={`flex items-center justify-center font-semibold text-sm w-7 h-7 rounded-full mb-1`}
      >
        {/* <-- UPDATED: Added dark mode classes */}
        <div className={`${isToday ? 'bg-blue-500 text-white rounded-full flex items-center justify-center w-7 h-7' : isCurrentMonth ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}`}>
          {day.date()}
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {dayEvents.slice(0, MAX_EVENTS_VISIBLE).map(event => {
          const truncatedTitle = event.title.length > 5
            ? `${event.title.substring(0, 5)}...`
            : event.title;

          return (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectEvent(event);
              }}
              style={{ backgroundColor: event.color || '#6366f1' }}
              className="text-white text-xs font-semibold p-1 rounded-md cursor-pointer"
            >
              {truncatedTitle}
            </div>
          );
        })}
        
        {dayEvents.length > MAX_EVENTS_VISIBLE && (
          // <-- UPDATED: Added dark mode class
          <div
            onClick={(e) => {
              e.stopPropagation();
              setModalDay(day);
              setModalEvents(dayEvents);
            }}
            className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline cursor-pointer"
          >
            more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDayCell;