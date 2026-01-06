import React, { useState } from 'react';
import { Course } from '../../types';

interface StartAttendanceModalProps {
  course: Course;
  onClose: () => void;
  onStart: (settings: AttendanceSettings) => void;
}

export interface AttendanceSettings {
  duration: number; // in minutes
  topic: string;
  enableGps: boolean;
  radius: number; // in meters
}

const StartAttendanceModal: React.FC<StartAttendanceModalProps> = ({ course, onClose, onStart }) => {
  const [duration, setDuration] = useState(1); // Default 1 minute
  const [topic, setTopic] = useState('');
  const [enableGps, setEnableGps] = useState(false);
  const [radius, setRadius] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      duration,
      topic: topic || `Lecture for ${new Date().toLocaleDateString()}`,
      enableGps,
      radius,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Start Attendance Session</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Topic */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Lecture Topic</label>
            <input
              type="text"
              className="form-input rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="e.g. Data Structures Introduction"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="text-lg font-bold text-primary min-w-[3ch] text-center">
                {duration < 1 ? `${duration * 60}s` : `${duration}m`}
                {duration % 1 !== 0 && duration > 1 ? ' 30s' : ''}
              </span>
            </div>
          </div>

          {/* GPS Guard */}
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">location_on</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Proximity Guard</h4>
                  <p className="text-xs text-slate-500">Require students to be nearby</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={enableGps}
                  onChange={(e) => setEnableGps(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            {enableGps && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-medium text-slate-500 mb-2 block">Allowed Radius: {radius}m</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Start Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartAttendanceModal;
