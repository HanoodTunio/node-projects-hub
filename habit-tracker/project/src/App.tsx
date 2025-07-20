import React from 'react';
import Header from './components/Header';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <div className="mb-8">
          <AddHabitForm />
        </div>
        
        <HabitList />
      </main>
    </div>
  );
}

export default App;