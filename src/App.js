import React from 'react';
import Calendar from './components/Calendar';
import eventsData from './data/events.json';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          My Calendar
        </h1>
        <Calendar events={eventsData} />
      </div>
    </div>
  );
}

export default App;