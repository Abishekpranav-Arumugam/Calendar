// src/components/CalendarHeader.js
import React from 'react';

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CalendarHeader = ({ currentDate, setCurrentDate, showPicker, setShowPicker, months, years, MonthIcon }) => {
    
    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };
    
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                {/* --- UPDATED: Added dark mode classes for buttons --- */}
                <button 
                    onClick={handlePrevMonth} 
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                    aria-label="Previous month"
                >
                    <ChevronLeftIcon />
                </button>
                {/* --- UPDATED: Added dark mode class for text --- */}
                <div 
                    onClick={() => setShowPicker(!showPicker)} 
                    className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer p-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                >
                    {MonthIcon && <MonthIcon />}
                    <span>{currentDate.format('MMMM YYYY')}</span>
                </div>
                <button 
                    onClick={handleNextMonth} 
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                    aria-label="Next month"
                >
                    <ChevronRightIcon />
                </button>
            </div>

            {showPicker && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border dark:border-gray-700">
                    <div className="flex gap-4">
                        <select
                            className="p-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            value={currentDate.month()}
                            onChange={(e) => setCurrentDate(currentDate.month(parseInt(e.target.value)))}
                        >
                            {months.map((month, index) => (
                                <option key={month} value={index}>{month}</option>
                            ))}
                        </select>
                        <select
                            className="p-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            value={currentDate.year()}
                            onChange={(e) => setCurrentDate(currentDate.year(parseInt(e.target.value)))}
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        onClick={() => setShowPicker(false)}
                        className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    );
};

export default CalendarHeader;