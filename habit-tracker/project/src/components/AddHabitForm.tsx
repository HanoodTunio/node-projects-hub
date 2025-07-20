import React, { useState } from 'react';
import { Plus, Calendar, Clock } from 'lucide-react';
import { useHabitStore } from '../store/habitStore';
import { HabitFrequency } from '../types/habit';

const AddHabitForm: React.FC = () => {
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [isOpen, setIsOpen] = useState(false);
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      addHabit(habitName.trim(), frequency);
      setHabitName('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add New Habit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Habit</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="habitName" className="block text-sm font-medium text-gray-700 mb-1">
            Habit Name
          </label>
          <input
            type="text"
            id="habitName"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Morning workout, Read for 30 mins..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFrequency('daily')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md border transition-colors duration-200 ${
                frequency === 'daily'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Clock size={16} />
              Daily
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md border transition-colors duration-200 ${
                frequency === 'monthly'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar size={16} />
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Add Habit
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddHabitForm;