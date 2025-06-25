// src/components/Calendar.js
import React, { useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import TimelineView from './TimelineView';
import EventModal from './EventModal';
import EventDetails from './EventDetails';
import CreateEventModal from './CreateEventModal';
import { SnowflakeIcon, LeafIcon, SunIcon, CloudSunIcon } from './WeatherIcons';
import { useTheme } from '../context/ThemeContext';

dayjs.extend(localeData);

const EventPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="rounded-xl border border-gray-400/40 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg p-6 w-full max-w-xs md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      <p className="font-bold text-lg text-slate-900 dark:text-slate-200">Select an event to see details</p>
      <p className="text-sm text-slate-800 dark:text-slate-400">Click on any event in the calendar below.</p>
    </div>
    <div className="hidden md:flex flex-col items-center justify-center text-center p-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto mb-4 text-gray-500/70 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      <p className="font-bold text-2xl text-slate-900/80 dark:text-slate-300/80">Select an event to see details</p>
      <p className="text-lg text-slate-800/70 dark:text-slate-400/70">Click on any event in the calendar below.</p>
    </div>
  </div>
);

// --- FIX: Restored the function bodies ---
const generateMonthDays = (date) => {
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

const generateWeekDays = (date) => {
  const startOfWeek = date.startOf('week');
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.add(i, 'day'));
  }
  return days;
};

const lightMonthGradients = [ 'linear-gradient(135deg, rgb(222, 237, 250) 0%, rgb(185, 212, 239) 100%)', 'linear-gradient(135deg, rgb(252, 228, 236) 0%, rgb(244, 204, 215) 100%)', 'linear-gradient(135deg, rgb(220, 245, 220) 0%, rgb(180, 225, 180) 100%)', 'linear-gradient(135deg, rgb(230, 230, 250) 0%, rgb(200, 210, 240) 100%)', 'linear-gradient(135deg, rgb(255, 224, 230) 0%, rgb(220, 200, 225) 100%)', 'linear-gradient(135deg, rgb(255, 250, 225) 0%, rgb(250, 235, 194) 100%)', 'linear-gradient(135deg, rgb(225, 245, 255) 0%, rgb(203, 232, 251) 100%)', 'linear-gradient(135deg, rgb(255, 240, 210) 0%, rgb(244, 221, 192) 100%)', 'linear-gradient(135deg, rgb(255, 230, 210) 0%, rgb(242, 213, 198) 100%)', 'linear-gradient(135deg, rgb(235, 225, 245) 0%, rgb(210, 195, 225) 100%)', 'linear-gradient(135deg, rgb(235, 230, 225) 0%, rgb(210, 205, 200) 100%)', 'linear-gradient(135deg, rgb(230, 245, 235) 0%, rgb(255, 225, 225) 100%)' ];
const monthIcons = [SnowflakeIcon, SnowflakeIcon, CloudSunIcon, CloudSunIcon, SunIcon, SunIcon, SunIcon, SunIcon, LeafIcon, LeafIcon, CloudSunIcon, SnowflakeIcon];
const darkMonthGradients = [ 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(17, 24, 39) 100%)', 'linear-gradient(135deg, rgb(49, 24, 39) 0%, rgb(31, 26, 42) 100%)', 'linear-gradient(135deg, rgb(16, 42, 32) 0%, rgb(20, 36, 40) 100%)', 'linear-gradient(135deg, rgb(28, 28, 54) 0%, rgb(24, 30, 48) 100%)', 'linear-gradient(135deg, rgb(53, 24, 35) 0%, rgb(44, 32, 53) 100%)', 'linear-gradient(135deg, rgb(58, 46, 22) 0%, rgb(48, 38, 28) 100%)', 'linear-gradient(135deg, rgb(20, 40, 60) 0%, rgb(25, 35, 50) 100%)', 'linear-gradient(135deg, rgb(60, 40, 20) 0%, rgb(48, 38, 30) 100%)', 'linear-gradient(135deg, rgb(64, 32, 24) 0%, rgb(52, 36, 32) 100%)', 'linear-gradient(135deg, rgb(35, 28, 50) 0%, rgb(40, 30, 45) 100%)', 'linear-gradient(135deg, rgb(40, 35, 30) 0%, rgb(34, 31, 30) 100%)', 'linear-gradient(135deg, rgb(20, 45, 40) 0%, rgb(30, 30, 35) 100%)' ];

const Calendar = forwardRef(({ events, onDeleteEvent, onUpdateEvent }, ref) => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [modalEvents, setModalEvents] = useState(null);
  const [modalDay, setModalDay] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const calendarTopRef = useRef(null);

  useImperativeHandle(ref, () => ({ goToToday: () => { setCurrentDate(dayjs()); setView('month'); }}));

  const years = useMemo(() => Array.from({ length: 2035 - 1990 + 1 }, (_, i) => 1990 + i), []);
  const months = useMemo(() => dayjs.months(), []);
  
  const displayedDays = useMemo(() => {
    switch (view) {
      case 'week': return generateWeekDays(currentDate);
      case 'day': return [currentDate.clone()];
      case 'month': default: return generateMonthDays(currentDate);
    }
  }, [currentDate, view]);

  const today = dayjs();

  const calendarStyle = useMemo(() => ({
    background: theme === 'light' ? lightMonthGradients[currentDate.month()] : darkMonthGradients[currentDate.month()],
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
    transition: 'background 0.5s ease-in-out'
  }), [currentDate, theme]);

  const MonthIcon = useMemo(() => monthIcons[currentDate.month()], [currentDate]);

  const handleDelete = (eventToDelete) => { onDeleteEvent(eventToDelete); setSelectedEvent(null); };
  const handleUpdate = (updatedEvent, originalEvent) => { onUpdateEvent(updatedEvent, originalEvent); setEditEvent(null); setSelectedEvent({ ...updatedEvent, id: originalEvent.id, isLocal: true }); };

  return (
    <div ref={calendarTopRef} className="calendar-glass relative p-2 sm:p-4 rounded-xl w-full font-sans max-w-7xl mx-auto" style={calendarStyle}>
      <div className="absolute inset-0 -z-10 pointer-events-none"></div>
      
      <div className="relative w-full min-h-[148px] md:min-h-[220px]">
        <AnimatePresence mode="wait">
          {selectedEvent ? ( <motion.div key="details" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}> <EventDetails selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} handleDeleteEvent={handleDelete} onEdit={() => setEditEvent(selectedEvent)} /> </motion.div> ) : 
          ( <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex"> <EventPlaceholder /> </motion.div> )}
        </AnimatePresence>
      </div>

      <EventModal modalEvents={modalEvents} modalDay={modalDay} setModalEvents={setModalEvents} setSelectedEvent={setSelectedEvent} />
      
      <div className="pb-2 mb-4 border-b border-gray-200/80 dark:border-gray-700/60">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} showPicker={showPicker} setShowPicker={setShowPicker} months={months} years={years} MonthIcon={MonthIcon} />
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 flex justify-center items-center space-x-1 sm:space-x-2 bg-white/30 dark:bg-black/20 p-1 rounded-lg">
              {['month', 'week', 'day'].map((viewName) => (
                <button
                  key={viewName}
                  onClick={() => setView(viewName)}
                  className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    view === viewName ? 'bg-white dark:bg-slate-200 text-blue-600 dark:text-slate-900 shadow-md' : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-black/20'
                  }`}
                >
                  {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {view === 'month' ? ( <MonthView displayedDays={displayedDays} currentDate={currentDate} today={today} events={events} handleSelectEvent={setSelectedEvent} setModalEvents={setModalEvents} setModalDay={setModalDay} /> ) : 
          ( <TimelineView view={view} displayedDays={displayedDays} events={events} handleSelectEvent={setSelectedEvent} today={today} /> )}
        </motion.div>
      </AnimatePresence>

      <div className="h-16 sm:h-20"></div>
      {editEvent && <CreateEventModal event={editEvent} onClose={() => setEditEvent(null)} onCreate={handleUpdate} isEdit />}
    </div>
  );
});

export default Calendar;