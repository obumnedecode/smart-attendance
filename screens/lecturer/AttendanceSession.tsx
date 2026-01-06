import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import { AttendanceSettings } from './StartAttendanceModal';
import QRCode from "react-qr-code";

interface AttendanceSessionProps {
  course: Course;
  settings: AttendanceSettings;
  onEndSession: () => void;
}

const AttendanceSession: React.FC<AttendanceSessionProps> = ({ course, settings, onEndSession }) => {
  const [timeLeft, setTimeLeft] = useState(settings.duration * 60);
  const [qrValue, setQrValue] = useState(`${course.code}-${Date.now()}`);
  const [attendees, setAttendees] = useState(0); // Mock for now

  // Timer Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Regenerate QR every 10 seconds for security
  useEffect(() => {
    const interval = setInterval(() => {
      setQrValue(`${course.code}-${Date.now()}`);
    }, 10000);
    return () => clearInterval(interval);
  }, [course.code]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      mins: mins.toString().padStart(2, '0'),
      secs: secs.toString().padStart(2, '0')
    };
  };

  const timeDisplay = formatTime(timeLeft);

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-background-dark max-w-lg mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-4 shadow-sm z-10 flex items-center justify-between">
        <button onClick={onEndSession} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{course.code}</p>
          <h1 className="text-sm font-bold text-slate-900 dark:text-white">{course.name}</h1>
        </div>
        <button className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          <span className="material-symbols-outlined text-2xl">settings</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-safe p-6 space-y-6">
        
        {/* Session Info */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{settings.topic}</h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Accepting Responses
          </div>
        </div>

        {/* Timer */}
        <div className="flex justify-center gap-4">
          <div className="bg-white dark:bg-slate-800 w-24 h-24 rounded-2xl shadow-sm flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-primary">{timeDisplay.mins}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Minutes</span>
          </div>
          <div className="flex items-center text-slate-300 text-2xl font-bold">:</div>
          <div className="bg-white dark:bg-slate-800 w-24 h-24 rounded-2xl shadow-sm flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-primary">{timeDisplay.secs}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Seconds</span>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-lg flex flex-col items-center gap-6">
          <div className="relative bg-white p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                 <span className="material-symbols-outlined text-slate-900 text-2xl">school</span>
              </div>
            </div>
            <QRCode
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrValue}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p className="text-sm font-medium text-slate-400">Scan with camera to check in</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{attendees}</span>
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Present</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-black text-slate-400">120</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Enrolled</span>
          </div>
        </div>

        <button className="w-full py-3 bg-white dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined">visibility</span>
            View Students
        </button>

        {/* GPS Status Card */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                        <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">GPS Verification</h4>
                        <p className="text-xs text-slate-500">Require proximity</p>
                    </div>
                </div>
                <div className={`w-12 h-7 rounded-full transition-colors relative ${settings.enableGps ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings.enableGps ? 'left-6' : 'left-1'}`}></div>
                </div>
            </div>
            
            {/* Mock Map View */}
            <div className="h-32 w-full bg-slate-100 rounded-xl overflow-hidden relative">
                {/* Simple grid pattern to look like a map */}
                <div className="absolute inset-0 opacity-20" style={{ 
                    backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>
                
                {/* Pulse Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                             <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md shadow-sm text-[10px] font-bold text-slate-500 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    Radius: {settings.radius}m
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="space-y-3 pt-4">
            <button 
                onClick={() => setQrValue(`${course.code}-${Date.now()}`)}
                className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
                <span className="material-symbols-outlined">refresh</span>
                Regenerate QR Code
            </button>
            <button 
                onClick={onEndSession}
                className="w-full py-4 bg-primary hover:bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
                <span className="material-symbols-outlined">stop_circle</span>
                End Attendance
            </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSession;
