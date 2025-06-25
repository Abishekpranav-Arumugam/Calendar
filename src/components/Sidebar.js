// src/components/Sidebar.js
import React from "react";
// --- NEW: Import your profile image ---
import profileImage from './Profile.jpg'; 

// The props now include isSidebarOpen and onClose for mobile toggling
const Sidebar = ({ onShowEvents, onShowCalendar, onGoToToday, activeView, isSidebarOpen, onClose }) => {
  const baseClasses = "text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2.5 flex items-center gap-3 cursor-pointer font-medium";
  const activeClasses = "font-semibold text-blue-600 bg-blue-100/60";

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-[254px] bg-gradient-to-b from-white via-blue-50 to-blue-100 border-r border-blue-200 shadow-2xl flex flex-col z-40 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="p-6 flex flex-col items-center border-b border-gray-200/80 relative">
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 md:hidden" aria-label="Close sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        {/* --- UPDATED: The src attribute now uses your imported image --- */}
        <img src={profileImage} alt="avatar" className="rounded-full w-20 h-20 mb-3 shadow-md object-cover" />
        
        <div className="font-bold text-lg text-gray-800">Abishek Pranav S A</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">Student</div>
          <span className="inline-block w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white shadow"></span>
        </div>
        <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold w-max mx-auto">
          Level 3 • Pro User
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li className={`${baseClasses} ${activeView === 'calendar' ? activeClasses : ''}`} onClick={onShowCalendar}><span role="img" aria-label="calendar">📅</span> Calendar</li>
          <li className={`${baseClasses} ${activeView === 'events' ? activeClasses : ''}`} onClick={onShowEvents}><span role="img" aria-label="events">📝</span> Events</li>
          <li className={baseClasses}><span role="img" aria-label="reminders">⏰</span> Reminders</li>
          <li className={baseClasses}><span role="img" aria-label="settings">⚙️</span> Settings</li>
        </ul>
      </nav>

      <div className="px-6 py-4 border-t border-gray-200/80 space-y-3">
        <button
          className="w-full bg-gray-100 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
          onClick={onGoToToday}
        >
          Today
        </button>
      </div>

      <div className="p-4 text-xs text-gray-400 text-center">
        v1.0 • © 2025
        <div className="flex gap-3 justify-center mt-2">
          <a href="https://www.linkedin.com/in/abishekpranav" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">LinkedIn</a>
          <a href="https://github.com/Abishekpranav-Arumugam" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">GitHub</a>
        </div>
      </div>
      <div className="px-6 py-2 flex items-center gap-2 text-sm text-blue-500">
        <span role="img" aria-label="calendar">📆</span>
        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none opacity-30">
        <svg width="100%" height="100%"><circle cx="40" cy="60" r="60" fill="#dbeafe" /><circle cx="220" cy="40" r="30" fill="#bae6fd" /></svg>
      </div>
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-200 to-blue-100 rounded-r"></div>
    </aside>
  );
};

export default Sidebar;