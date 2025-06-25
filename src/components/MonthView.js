// src/components/MonthView.js
import React from 'react';
import CalendarDayCell from './CalendarDayCell';

const MonthView = ({ displayedDays, currentDate, today, events, handleSelectEvent, setModalEvents, setModalDay }) => {
  return (
    <div>
      {/* Weekday Headers (Unchanged) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-semibold mb-2 text-base sm:text-lg tracking-widest">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div
            key={day}
            className={
              "py-1 rounded-lg bg-white " +
              (idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : "text-gray-700") +
              " shadow-sm uppercase font-bold"
            }
            style={{ letterSpacing: "0.12em" }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* --- UPDATED: Days Grid --- */}
      {/* Re-added the 'perspective-1000' class to enable the 3D hover effect */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 perspective-1000">
        {displayedDays.map((day, index) => (
          <CalendarDayCell
            key={index}
            day={day}
            currentDate={currentDate}
            today={today}
            events={events}
            handleSelectEvent={handleSelectEvent}
            setModalEvents={setModalEvents}
            setModalDay={setModalDay}
          />
        ))}
      </div>
    </div>
  );
};

export default MonthView;