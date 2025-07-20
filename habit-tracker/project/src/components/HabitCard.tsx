import React from 'react';
import { Check, Trash2, Flame, Calendar, Clock } from 'lucide-react';
import { Habit } from '../types/habit';
import { useHabitStore } from '../store/habitStore';

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { completeHabit, removeHabit, isHabitCompletedToday } = useHabitStore();
  const isCompleted = isHabitCompletedToday(habit);

  const handleComplete = () => {
    if (!isCompleted) {
      completeHabit(habit.id);
    }
  };

  const handleRemove = () => {
    if (confirm('Are you sure you want to delete this habit?')) {
      removeHabit(habit.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all duration-300 ${
      isCompleted 
        ? 'border-green-500 bg-green-50' 
        : 'border-gray-200 hover:border-blue-300'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{habit.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              {habit.frequency === 'daily' ? <Clock size={14} /> : <Calendar size={14} />}
              <span className="capitalize">{habit.frequency}</span>
            </div>
            {habit.streak > 0 && (
              <div className="flex items-center gap-1 text-orange-600">
                <Flame size={14} />
                <span>{habit.streak} streak</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
          title="Delete habit"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            isCompleted
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md'
          }`}
        >
          <Check size={16} />
          {isCompleted ? 'Completed!' : 'Mark Complete'}
        </button>
      </div>

      {isCompleted && (
        <div className="mt-3 text-center text-sm text-green-600 font-medium">
          Great job! Keep up the streak! 🎉
        </div>
      )}
    </div>
  );
};

export default HabitCard;