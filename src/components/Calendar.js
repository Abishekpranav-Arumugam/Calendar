import React, { useState, useMemo, useRef } from 'react';
import dayjs from 'dayjs';

// Helper function to generate an array of days for the calendar grid
const generateCalendarDays = (date) => {
  const firstDayOfMonth = date.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.day(); // 0 (Sun) to 6 (Sat)
  
  const days = [];
  let currentDay = firstDayOfMonth.subtract(firstDayOfWeek, 'day');
  for (let i = 0; i < 42; i++) {
    days.push(currentDay.clone());
    currentDay = currentDay.add(1, 'day');
  }
  return days;
};

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [modalEvents, setModalEvents] = useState(null);
  const [modalDay, setModalDay] = useState(null);

  const calendarTopRef = useRef(null);

  // For year range, you can adjust as needed
  const years = [];
  for (let y = 1990; y <= 2035; y++) years.push(y);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
    setSelectedEvent(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
    setSelectedEvent(null);
  };
  
  const calendarDays = useMemo(() => generateCalendarDays(currentDate), [currentDate]);
  const today = dayjs();

  // Helper to select event and scroll to top
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    if (calendarTopRef.current) {
      calendarTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={calendarTopRef} className="p-2 sm:p-4 bg-white rounded-lg shadow-lg w-full font-sans max-w-5xl mx-auto">
      {/* Modal for all events on a day */}
      {modalEvents && (
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
                  className="flex items-center bg-gray-50 border-l-4 rounded p-2 cursor-pointer hover:bg-blue-50 transition"
                  style={{ borderColor: event.color }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setModalEvents(null);
                  }}
                >
                  <div>
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
      )}

      {/* Selected Event Details */}
      {selectedEvent && (
        <div className="mb-4 sm:mb-8 p-4 sm:p-6 rounded-xl border border-gray-200 bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between relative overflow-hidden">
          {/* Colored left border */}
          <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl" style={{ backgroundColor: selectedEvent.color }}></div>
          <div className="flex-1 pl-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="uppercase text-xs font-semibold text-green-600 tracking-wider">Event</span>
              {/* You can add a badge for recurring/weekly if needed */}
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
      )}

      {/* Header: Month Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex flex-row sm:flex-row gap-2 w-full sm:w-auto justify-between">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 text-xs sm:text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Previous
          </button>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 text-xs sm:text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Next
          </button>
        </div>
        <div className="relative w-full sm:w-auto flex justify-center">
          <h2
            className="text-xl sm:text-2xl font-bold text-gray-800 text-center w-full sm:w-auto cursor-pointer hover:underline"
            onClick={() => setShowPicker(!showPicker)}
          >
            {currentDate.format('MMMM YYYY')}
          </h2>
          {showPicker && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 flex flex-col sm:flex-row gap-2">
              <select
                className="border rounded px-2 py-1"
                value={currentDate.month()}
                onChange={e => {
                  setCurrentDate(currentDate.month(Number(e.target.value)));
                  setShowPicker(false);
                }}
              >
                {months.map((m, idx) => (
                  <option key={m} value={idx}>{m}</option>
                ))}
              </select>
              <select
                className="border rounded px-2 py-1"
                value={currentDate.year()}
                onChange={e => {
                  setCurrentDate(currentDate.year(Number(e.target.value)));
                  setShowPicker(false);
                }}
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Day names */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-semibold text-gray-500 mb-2 text-xs sm:text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Grid: Dates */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.month() === currentDate.month();
          const isToday = day.isSame(today, 'day');

          // --- Event Handling and Conflict Detection ---
          const eventsForDay = events
            .filter(event => dayjs(event.date).isSame(day, 'day'))
            .map(event => {
                const start = dayjs(`${event.date} ${event.time}`);
                const end = start.add(event.duration, 'minute');
                return { ...event, start, end };
            })
            .sort((a, b) => a.start.valueOf() - b.start.valueOf());
            
          // Detect conflicts
          const processedEvents = eventsForDay.map((event, i) => {
            let isConflicting = false;
            for (let j = 0; j < eventsForDay.length; j++) {
              if (i === j) continue;
              const otherEvent = eventsForDay[j];
              if (event.start.isBefore(otherEvent.end) && otherEvent.start.isBefore(event.end)) {
                isConflicting = true;
                break;
              }
            }
            return { ...event, isConflicting };
          });

          return (
            <div
              key={index}
              className={`border rounded-md p-1 sm:p-2 bg-white flex flex-col transition-colors
                ${isCurrentMonth ? '' : 'bg-gray-50 text-gray-400'}
                ${isToday ? 'border-blue-500' : 'border-gray-200'}
                `}
              style={{
                height: '6.5rem', // fixed height for all cells (adjust as needed)
                overflow: 'hidden'
              }}
            >
              <div className="flex justify-center items-center">
                <span
                  className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold
                    ${isToday ? 'bg-blue-500 text-white' : ''}
                    ${!isToday && isCurrentMonth && (day.day() === 0 || day.day() === 6) ? 'text-red-500' : ''}
                    ${!isToday && !isCurrentMonth && (day.day() === 0 || day.day() === 6) ? 'text-red-300' : ''}
                    ${!isCurrentMonth && !(day.day() === 0 || day.day() === 6) ? 'text-gray-400' : ''}
                  `}
                >
                  {day.date()}
                </span>
              </div>
              <div className="mt-1 overflow-hidden text-[10px] sm:text-xs space-y-1 flex-1">
                {processedEvents.length > 0 && (
                  <div
                    key={processedEvents[0].title + processedEvents[0].time}
                    className="relative bg-white rounded-md shadow flex items-center cursor-pointer border border-gray-200 pr-1 pl-2 py-0.5 mb-1 min-h-[1.5rem] hover:shadow-md transition group"
                    style={{ borderLeft: `4px solid ${processedEvents[0].color}` }}
                    title={processedEvents[0].title}
                    onClick={() => handleSelectEvent(processedEvents[0])}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-[9px] sm:text-xs truncate max-w-[110px] sm:max-w-[140px] group-hover:text-blue-700">
                        {processedEvents[0].title}
                      </div>
                    </div>
                  </div>
                )}
                {processedEvents.length > 1 && (
                  <div
                    className="text-blue-500 text-xs cursor-pointer underline"
                    onClick={() => {
                      setModalEvents(processedEvents);
                      setModalDay(day);
                    }}
                  >
                    more...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;