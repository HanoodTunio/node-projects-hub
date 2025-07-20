export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'monthly';
  streak: number;
  lastCompleted: string | null;
  createdAt: string;
  completedDates: string[];
}

export type HabitFrequency = 'daily' | 'monthly';