// src/App.js
import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import EventsList from './components/EventsList';
import CreateEventModal from './components/CreateEventModal';
import ThemeToggle from './components/ThemeToggle';
import staticEventsData from './data/events.json';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeView, setActiveView] = useState('calendar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const calendarRef = useRef();

  // All your state and functions remain unchanged...
  const [allEvents, setAllEvents] = useState(() => {
    const processedStaticEvents = staticEventsData.map((event, index) => ({...event, id: `static-${index}`, isLocal: false}));
    const localEventsFromStorage = JSON.parse(localStorage.getItem('userEvents')) || [];
    return [...processedStaticEvents, ...localEventsFromStorage];
  });
  const saveLocalEvents = (eventsToSave) => { localStorage.setItem('userEvents', JSON.stringify(eventsToSave.filter(e => e.isLocal))); };
  const handleCreateEvent = (newEvent) => {
    const eventToAdd = { ...newEvent, id: Date.now(), isLocal: true };
    const updatedEvents = [...allEvents, eventToAdd];
    setAllEvents(updatedEvents);
    saveLocalEvents(updatedEvents);
    setShowCreateModal(false);
  };
  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = allEvents.filter(ev => ev.id !== eventToDelete.id);
    setAllEvents(updatedEvents);
    saveLocalEvents(updatedEvents);
  };
  const handleUpdateEvent = (updatedEvent, originalEvent) => {
    const updatedEvents = allEvents.map(ev => ev.id === originalEvent.id ? { ...updatedEvent, id: originalEvent.id, isLocal: true } : ev);
    setAllEvents(updatedEvents);
    saveLocalEvents(updatedEvents);
  };
  const handleGoToToday = () => {
    if (calendarRef.current && calendarRef.current.goToToday) {
      calendarRef.current.goToToday();
    }
    setActiveView('calendar');
  };

  return (
    // --- UPDATED: Removed bg-gray-50 dark:bg-gray-900 from this div ---
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
      
      {/* The polygon background is now visible again! */}
      <div className="polygon-bg dark:opacity-20">
        <div className="shape shape-hexagon shape1"></div>
        <div className="shape shape-pentagon shape2"></div>
        <div className="shape shape-diamond shape3"></div>
        <div className="shape shape-triangle shape4"></div>
      </div>

      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-4 left-4 z-50 p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-md md:hidden" aria-label="Open sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {isSidebarOpen && (<div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-30 md:hidden"></div>)}

      <main className="flex-1 flex w-full">
        <Sidebar
          onShowEvents={() => setActiveView('events')}
          onShowCalendar={() => setActiveView('calendar')}
          onGoToToday={handleGoToToday}
          activeView={activeView}
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 md:ml-[254px] flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 transition-all duration-300 pt-20 pb-8 md:pt-8">
          <div className="w-full max-w-7xl mx-auto">
            {activeView === 'calendar' ? (
              <Calendar
                ref={calendarRef}
                events={allEvents}
                onDeleteEvent={handleDeleteEvent}
                onUpdateEvent={handleUpdateEvent}
              />
            ) : (
              <EventsList events={allEvents} />
            )}
          </div>
        </div>
      </main>

      <button onClick={() => setShowCreateModal(true)} className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110" aria-label="Add new event">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
      </button>

      <footer className="w-full bg-black text-white text-center py-4 shadow-lg mt-auto z-20 md:ml-[254px] transition-all duration-300 dark:bg-gray-950">
        <p className="text-sm font-semibold tracking-wide">Designed & Built by Abishek Pranav © {new Date().getFullYear()}</p>
      </footer>

      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateEvent}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App;