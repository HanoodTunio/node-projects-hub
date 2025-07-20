import React from 'react';
import { useHabitStore } from '../store/habitStore';
import HabitCard from './HabitCard';
import { Calendar, CheckCircle, Target } from 'lucide-react';

const HabitList: React.FC = () => {
  const habits = useHabitStore((state) => state.habits);

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Target className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No habits yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Start building better habits by adding your first habit above. Set daily or monthly goals and track your progress!
        </p>
      </div>
    );
  }

  const completedToday = habits.filter(habit => {
    const { isHabitCompletedToday } = useHabitStore.getState();
    return isHabitCompletedToday(habit);
  }).length;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Today's Progress</h3>
              <p className="text-sm text-gray-600">
                {completedToday} of {habits.length} habits completed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-2xl font-bold text-green-600">
              {habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0}%
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${habits.length > 0 ? (completedToday / habits.length) * 100 : 0}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default HabitList;