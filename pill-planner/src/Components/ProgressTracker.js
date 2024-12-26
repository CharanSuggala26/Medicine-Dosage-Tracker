import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';

function ProgressTracker({ totalMedications, takenCount, streak }) {
  const progress = totalMedications > 0 
    ? Math.round((takenCount / totalMedications) * 100) 
    : 0;

  const getLevel = (streak) => {
    if (streak < 3) return 'Beginner';
    if (streak < 7) return 'Regular';
    if (streak < 14) return 'Consistent';
    if (streak < 30) return 'Champion';
    return 'Master';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-semibold">Your Progress</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-gray-700">Level: {getLevel(streak)}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Today's Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-gray-600">Streak</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-500">{streak}</span>
            <span className="text-gray-600">days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;