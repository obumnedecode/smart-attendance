
import React, { useState, useEffect } from 'react';
import { Course } from '../types';

interface LecturerQRViewProps {
  course: Course;
  onClose: () => void;
}

const LecturerQRView: React.FC<LecturerQRViewProps> = ({ course, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [attendees, setAttendees] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    // Simulate someone joining
    const attendeeTimer = setInterval(() => {
      if (Math.random() > 0.7) setAttendees(prev => prev + 1);
    }, 3000);
    return () => { clearInterval(timer); clearInterval(attendeeTimer); };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-background-dark flex flex-col max-w-lg mx-auto shadow-2xl overflow-y-auto no-scrollbar">
      <header className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
        <button onClick={onClose} className="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest">{course.code}</p>
          <h1 className="text-sm font-bold text-slate-900 dark:text-white">Session Check-in</h1>
        </div>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full px-8 pt-8 pb-40">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full border border-emerald-100 dark:border-emerald-800 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Live Session</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">Project Demo: React</h2>
        </div>

        <div className="w-full bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[120px]">qr_code_2</span>
          </div>
          
          <div className="w-full aspect-square max-w-[260px] bg-white rounded-3xl overflow-hidden relative border-8 border-slate-900 dark:border-white p-3 shadow-xl">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=AttendanceToken-${course.id}-${Math.floor(Date.now()/30000)}`} 
              className="w-full h-full object-contain" 
              alt="QR Code" 
            />
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Refreshes in</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{formatTime(timeLeft)}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 text-center transition-all hover:scale-105">
             <p className="text-4xl font-black text-primary tabular-nums">{attendees}</p>
             <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Checked In</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-[2rem] text-center transition-all hover:scale-105">
             <p className="text-4xl font-black text-white tabular-nums">120</p>
             <p className="text-[10px] text-white/40 font-black uppercase mt-1">Total Class</p>
          </div>
        </div>

        <div className="w-full mt-8 p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white">Proximity Guard</p>
              <p className="text-[10px] font-bold text-slate-400">50m Geofence Active</p>
            </div>
          </div>
          <div className="flex size-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-6 pb-10 z-40 max-w-lg mx-auto">
        <button onClick={onClose} className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500 text-white font-black shadow-xl shadow-red-500/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined">stop_circle</span>
          End Attendance
        </button>
      </div>
    </div>
  );
};

export default LecturerQRView;
