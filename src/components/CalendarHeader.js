import React from 'react';

const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  showPicker,
  setShowPicker,
  months,
  years
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
    <div className="flex flex-row sm:flex-row gap-2 w-full sm:w-auto justify-between">
      <button
        onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
        className="px-3 py-1 text-xs sm:text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
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
);

export default CalendarHeader;