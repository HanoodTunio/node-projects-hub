import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, HabitFrequency } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  addHabit: (name: string, frequency: HabitFrequency) => void;
  removeHabit: (id: string) => void;
  completeHabit: (id: string) => void;
  isHabitCompletedToday: (habit: Habit) => boolean;
  getHabitProgress: (habit: Habit) => number;
}

const getCurrentPeriodKey = (frequency: HabitFrequency): string => {
  const now = new Date();
  if (frequency === 'daily') {
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
  } else {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
  }
};

const canComplete = (habit: Habit): boolean => {
  const currentPeriodKey = getCurrentPeriodKey(habit.frequency);
  return !habit.completedDates.includes(currentPeriodKey);
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      
      addHabit: (name: string, frequency: HabitFrequency) => {
        const newHabit: Habit = {
          id: crypto.randomUUID(),
          name,
          frequency,
          streak: 0,
          lastCompleted: null,
          createdAt: new Date().toISOString(),
          completedDates: [],
        };
        
        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },
      
      removeHabit: (id: string) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        }));
      },
      
      completeHabit: (id: string) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id || !canComplete(habit)) {
              return habit;
            }
            
            const currentPeriodKey = getCurrentPeriodKey(habit.frequency);
            const newCompletedDates = [...habit.completedDates, currentPeriodKey];
            
            // Calculate new streak
            let newStreak = habit.streak + 1;
            
            // Check if streak should be reset (missed previous period)
            if (habit.frequency === 'daily' && habit.lastCompleted) {
              const lastDate = new Date(habit.lastCompleted);
              const today = new Date();
              const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
              
              if (daysDiff > 1) {
                newStreak = 1; // Reset streak if more than 1 day gap
              }
            }
            
            return {
              ...habit,
              streak: newStreak,
              lastCompleted: new Date().toISOString(),
              completedDates: newCompletedDates,
            };
          }),
        }));
      },
      
      isHabitCompletedToday: (habit: Habit) => {
        const currentPeriodKey = getCurrentPeriodKey(habit.frequency);
        return habit.completedDates.includes(currentPeriodKey);
      },
      
      getHabitProgress: (habit: Habit) => {
        const currentPeriodKey = getCurrentPeriodKey(habit.frequency);
        return habit.completedDates.includes(currentPeriodKey) ? 100 : 0;
      },
    }),
    {
      name: 'habit-tracker-storage',
    }
  )
);