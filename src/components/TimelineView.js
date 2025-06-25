// src/components/TimelineView.js
import React, { useMemo, useRef, useEffect } from 'react';
import dayjs from 'dayjs';

const hours = Array.from({ length: 24 }, (_, i) => i);

const TimelineView = ({ view, displayedDays, events, handleSelectEvent, today }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to 8 AM on initial render for desktop view
      const scrollTo = containerRef.current.scrollHeight * (8 / 24);
      containerRef.current.scrollTop = scrollTo;
    }
  }, [displayedDays]);

  const getEventsForDay = useMemo(() => {
    return (day) => events.filter(e => dayjs(e.date).isSame(day, 'day'));
  }, [events]);

  const calculateEventStyle = (event) => {
    const start = dayjs(event.startTime || event.date);
    const end = event.endTime ? dayjs(event.endTime) : start.add(1, 'hour');
    const durationMinutes = end.diff(start, 'minute');
    const startOfDay = start.startOf('day');
    const minutesFromMidnight = start.diff(startOfDay, 'minute');
    const top = (minutesFromMidnight / (24 * 60)) * 100;
    const height = (durationMinutes / (24 * 60)) * 100;
    return { top: `${top}%`, height: `${Math.max(height, 2)}%` };
  };

  // --- RENDER ---
  return (
    <>
      {/* ================================================================== */}
      {/* =================== DESKTOP VIEW (md and up) =================== */}
      {/* ================================================================== */}
      {/* This layout is hidden on mobile and visible on desktop */}
      <div
        ref={containerRef}
        className="hidden md:flex h-[70vh] max-h-[70vh] overflow-y-auto bg-white/30 rounded-lg shadow-inner"
      >
        {/* Time Gutter */}
        <div className="w-16 text-xs text-center text-gray-600 font-semibold border-r border-gray-300/50">
          {hours.map(hour => (
            <div key={hour} className="h-24 flex items-start justify-center pt-1 relative">
              <span className="bg-white/40 px-1 rounded">{dayjs().hour(hour).format('h A')}</span>
              <div className="absolute top-0 left-12 w-full h-px bg-gray-300/40"></div>
            </div>
          ))}
        </div>

        {/* Day Columns Container */}
        <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${displayedDays.length}, 1fr)` }}>
          {displayedDays.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            const timedEvents = dayEvents.filter(e => e.startTime || dayjs(e.date).format('HH:mm:ss') !== '00:00:00');
            const allDayEvents = dayEvents.filter(e => !timedEvents.includes(e));
            
            return (
              <div key={index} className="relative border-l border-gray-300/50">
                <div className="sticky top-0 z-10 bg-white/60 backdrop-blur-sm">
                  <div className={`text-center py-2 border-b-2 ${today.isSame(day, 'day') ? 'border-blue-500 text-blue-600' : 'border-gray-300/50'}`}>
                    <p className="font-bold text-lg">{day.format('ddd')}</p>
                    <p className={`text-2xl font-bold ${today.isSame(day, 'day') ? 'text-white bg-blue-500 rounded-full w-10 h-10 mx-auto flex items-center justify-center' : ''}`}>{day.format('D')}</p>
                  </div>
                  <div className="p-1 border-b border-gray-300/50 min-h-[36px]">
                    {allDayEvents.map(event => (
                      <div key={event.id} onClick={() => handleSelectEvent(event)} className="rounded-md bg-green-500 text-white text-xs font-semibold p-1 mb-1 truncate cursor-pointer hover:bg-green-600">
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 pointer-events-none">{hours.map(hour => (<div key={hour} className="h-24 border-t border-gray-300/40"></div>))}</div>
                  <div className="relative h-full">
                    {timedEvents.map(event => (
                      <div key={event.id} className="absolute z-20 p-2 m-1 rounded-lg bg-blue-500 text-white shadow-lg cursor-pointer hover:bg-blue-600 transition-colors overflow-hidden" style={calculateEventStyle(event)} onClick={() => handleSelectEvent(event)}>
                        <p className="font-bold text-sm leading-tight">{event.title}</p>
                        <p className="text-xs leading-tight opacity-90">{dayjs(event.startTime || event.date).format('h:mm A')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================================== */}
      {/* =================== MOBILE VIEW (sm and smaller) =================== */}
      {/* ================================================================== */}
      {/* This layout is visible on mobile and hidden on desktop */}
      <div className="block md:hidden h-[70vh] max-h-[70vh] overflow-y-auto bg-white/40 rounded-lg p-2 space-y-4">
        {displayedDays.map(day => {
          const dayEvents = getEventsForDay(day).sort((a,b) => dayjs(a.startTime || a.date) - dayjs(b.startTime || b.date));
          
          if (view === 'day' || (view === 'week' && dayEvents.length > 0)) {
            return (
              <div key={day.format('YYYY-MM-DD')}>
                <div className={`flex items-center gap-4 p-2 rounded-t-lg ${today.isSame(day, 'day') ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <div className={`text-center ${today.isSame(day, 'day') ? 'text-blue-600' : 'text-gray-700'}`}>
                    <p className="font-semibold text-xs">{day.format('ddd').toUpperCase()}</p>
                    <p className="font-bold text-2xl">{day.format('D')}</p>
                  </div>
                  <p className="font-bold text-gray-800">{day.format('dddd, MMMM YYYY')}</p>
                </div>
                {dayEvents.length > 0 ? (
                  <div className="space-y-2 p-2 bg-white/80 rounded-b-lg">
                    {dayEvents.map(event => {
                       const isAllDay = !event.startTime && dayjs(event.date).format('HH:mm:ss') === '00:00:00';
                       return (
                        <div key={event.id} onClick={() => handleSelectEvent(event)} className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-50">
                          <div className="w-1.5 h-full rounded-full" style={{backgroundColor: event.color || '#6366f1'}}></div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{event.title}</p>
                            <p className="text-sm text-gray-500">{isAllDay ? 'All-day' : dayjs(event.startTime).format('h:mm A')}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 p-4 bg-white/80 rounded-b-lg">No events</p>
                )}
              </div>
            )
          }
          return null;
        })}
      </div>
    </>
  );
};

export default TimelineView;