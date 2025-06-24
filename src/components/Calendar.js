import React, { useState, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';
import CalendarDayCell from './CalendarDayCell';
import EventModal from './EventModal';
import EventDetails from './EventDetails';
import CreateEventModal from './CreateEventModal';

const generateCalendarDays = (date) => {
  const firstDayOfMonth = date.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.day();
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [localEvents, setLocalEvents] = useState(() => {
    const stored = localStorage.getItem('calendarEvents');
    return stored ? JSON.parse(stored) : events;
  });
  const [alertMsg, setAlertMsg] = useState('');
  const calendarTopRef = useRef(null);

  const years = [];
  for (let y = 1990; y <= 2035; y++) years.push(y);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarDays = useMemo(() => generateCalendarDays(currentDate), [currentDate]);
  const today = dayjs();

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    if (calendarTopRef.current) {
      calendarTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateEvent = (newEvent) => {
    // Check for overlap
    const newStart = dayjs(`${newEvent.date} ${newEvent.time}`);
    const newEnd = newStart.add(Number(newEvent.duration), 'minute');
    const conflict = localEvents.some(ev => {
      if (ev.date !== newEvent.date) return false;
      const evStart = dayjs(`${ev.date} ${ev.time}`);
      const evEnd = evStart.add(Number(ev.duration), 'minute');
      return newStart.isBefore(evEnd) && evStart.isBefore(newEnd);
    });
    if (conflict) {
      setAlertMsg('This event overlaps with an existing event on this day.');
      return;
    }
    const updatedEvents = [...localEvents, { ...newEvent, isLocal: true }];
    setLocalEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setShowCreateModal(false);
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = localEvents.filter(ev =>
      !(
        ev.title === eventToDelete.title &&
        ev.date === eventToDelete.date &&
        ev.time === eventToDelete.time &&
        ev.isLocal // Only delete if isLocal
      )
    );
    setLocalEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  return (
    <div ref={calendarTopRef} className="p-2 sm:p-4 bg-white rounded-lg shadow-lg w-full font-sans max-w-5xl mx-auto">
      <EventModal
        modalEvents={modalEvents}
        modalDay={modalDay}
        setModalEvents={setModalEvents}
        setSelectedEvent={handleSelectEvent}
      />
      <EventDetails
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        months={months}
        years={years}
      />
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-semibold text-gray-500 mb-2 text-xs sm:text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((day, index) => (
          <CalendarDayCell
            key={index}
            day={day}
            currentDate={currentDate}
            today={today}
            events={localEvents}
            handleSelectEvent={handleSelectEvent}
            setModalEvents={setModalEvents}
            setModalDay={setModalDay}
          />
        ))}
      </div>
      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateEvent}
        />
      )}
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-3xl"
        onClick={() => setShowCreateModal(true)}
        aria-label="Add Event"
      >
        +
      </button>
      {alertMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
            <div className="text-red-600 font-bold mb-2">Warning ! ! !</div>
            <div className="mb-4">{alertMsg}</div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setAlertMsg('')}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;