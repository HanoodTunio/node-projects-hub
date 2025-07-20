import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Habit Tracker</h1>
              <p className="text-sm text-gray-600">Build better habits, one day at a time</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <TrendingUp size={20} />
            <span className="text-sm font-medium">Track Progress</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;