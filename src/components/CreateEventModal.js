import React, { useState, useEffect } from 'react';

const CreateEventModal = ({ onClose, onCreate, event, isEdit }) => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    description: '',
    color: '#6366f1'
  });

  useEffect(() => {
    if (event) setForm(event);
  }, [event]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.duration) return;
    if (isEdit) {
      onCreate({ ...form, duration: Number(form.duration) }, event); // Pass original event as 2nd arg
    } else {
      onCreate({ ...form, duration: Number(form.duration) });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-2">{isEdit ? 'Edit Event' : 'Create Event'}</h2>
        <input className="w-full border rounded px-2 py-1" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input className="w-full border rounded px-2 py-1" name="date" type="date" value={form.date} onChange={handleChange} required />
        <input className="w-full border rounded px-2 py-1" name="time" type="time" value={form.time} onChange={handleChange} required />
        <input className="w-full border rounded px-2 py-1" name="duration" type="number" min="1" placeholder="Duration (min)" value={form.duration} onChange={handleChange} required />
        <input className="w-full border rounded px-2 py-1" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input className="w-full border rounded px-2 py-1" name="color" type="color" value={form.color} onChange={handleChange} />
        <div className="flex justify-end gap-2">
          <button type="button" className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventModal;
