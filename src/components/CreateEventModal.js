// src/components/CreateEventModal.js
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'; // Import dayjs to handle date/time combination

const CreateEventModal = ({ onClose, onCreate, event, isEdit }) => {
  const [form, setForm] = useState({
    title: '',
    // Use dayjs to format the date correctly for the input
    date: event ? dayjs(event.date).format('YYYY-MM-DD') : '',
    time: event ? dayjs(event.startTime || event.date).format('HH:mm') : '',
    description: event?.description || '',
    color: event?.color || '#6366f1',
    // Add other fields from your initial code if needed
  });

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || '',
        date: dayjs(event.date).format('YYYY-MM-DD'),
        time: dayjs(event.startTime || event.date).format('HH:mm'),
        description: event.description || '',
        color: event.color || '#6366f1',
      });
    }
  }, [event]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) return;

    // Combine date and time into a full ISO string for startTime
    const combinedDateTime = dayjs(`${form.date}T${form.time}`).toISOString();

    const eventData = {
      ...form,
      date: dayjs(form.date).startOf('day').toISOString(), // Keep date as start of day
      startTime: combinedDateTime,
      // You can add logic for endTime if needed, e.g., startTime + 1 hour
      endTime: dayjs(combinedDateTime).add(1, 'hour').toISOString(),
    };
    
    if (isEdit) {
      onCreate(eventData, event); // Pass original event as 2nd arg
    } else {
      onCreate(eventData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <form className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm space-y-4 transform transition-all" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{isEdit ? 'Edit Event' : 'Create Event'}</h2>
        <input className="w-full border-gray-300 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <div className="flex gap-4">
          <input className="w-full border-gray-300 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="date" type="date" value={form.date} onChange={handleChange} required />
          <input className="w-full border-gray-300 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="time" type="time" value={form.time} onChange={handleChange} required />
        </div>
        <textarea className="w-full border-gray-300 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        
        <div className="flex items-center gap-4">
          <label htmlFor="color" className="font-medium text-gray-700">Color:</label>
          <input id="color" className="h-10 w-10 rounded-md border-gray-300" name="color" type="color" value={form.color} onChange={handleChange} />
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-sm">
            {isEdit ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventModal;