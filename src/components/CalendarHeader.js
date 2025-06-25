// src/components/CalendarHeader.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarHeader = ({ currentDate, setCurrentDate, showPicker, setShowPicker, months, years, MonthIcon }) => {

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(currentDate.month(newMonth));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(currentDate.year(newYear));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-500/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          className="text-lg sm:text-xl font-bold text-slate-700 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-500/10 transition-colors" 
          onClick={() => setShowPicker(!showPicker)}
        >
          <div className="flex items-center justify-center gap-x-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDate.month()}
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
                transition={{ duration: 0.3, ease: "circOut" }}
              >
                {MonthIcon && <MonthIcon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-600 drop-shadow-sm" />}
              </motion.div>
            </AnimatePresence>
            <span>{months[currentDate.month()]}</span>
            <span className="font-semibold">{currentDate.year()}</span>
          </div>
        </div>
        
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-500/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-black ring-opacity-5 p-4"
          >
            <div className="flex justify-between gap-x-2">
              <select 
                value={currentDate.month()} 
                onChange={handleMonthChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              <select 
                value={currentDate.year()} 
                onChange={handleYearChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarHeader;