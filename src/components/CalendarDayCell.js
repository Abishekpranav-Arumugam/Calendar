import React from 'react';
import dayjs from 'dayjs';

const CalendarDayCell = ({
  day,
  currentDate,
  today,
  events,
  handleSelectEvent,
  setModalEvents,
  setModalDay
}) => {
  const isCurrentMonth = day.month() === currentDate.month();
  const isToday = day.isSame(today, 'day');

  const eventsForDay = events
    .filter(event => dayjs(event.date).isSame(day, 'day'))
    .map(event => {
      const start = dayjs(`${event.date} ${event.time}`);
      const end = start.add(event.duration, 'minute');
      return { ...event, start, end };
    })
    .sort((a, b) => a.start.valueOf() - b.start.valueOf());

  // Conflict detection (optional, keep if you use it)
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
      className={`border rounded-md p-1 sm:p-2 bg-white flex flex-col transition-colors
        ${isCurrentMonth ? '' : 'bg-gray-50 text-gray-400'}
        ${isToday ? 'border-blue-500' : 'border-gray-200'}
      `}
      style={{
        height: '6.5rem',
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
};

export default CalendarDayCell;