
import React, { useState, useEffect } from 'react';
import { Course, AttendanceStatus } from '../types';

interface AttendanceFlowProps {
  course: Course;
  onClose: () => void;
}

const AttendanceFlow: React.FC<AttendanceFlowProps> = ({ course, onClose }) => {
  const [status, setStatus] = useState<AttendanceStatus>(AttendanceStatus.PERMISSION_NEEDED);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Transition simulations
  useEffect(() => {
    if (status === AttendanceStatus.VERIFYING) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Randomly decide outcome for demo purposes
            const rand = Math.random();
            if (rand > 0.8) setStatus(AttendanceStatus.ERROR_LOCATION);
            else if (rand > 0.7) setStatus(AttendanceStatus.ERROR_EXPIRED);
            else if (rand > 0.6) setStatus(AttendanceStatus.ERROR_DENIED);
            else if (rand > 0.5) setStatus(AttendanceStatus.ALREADY_MARKED);
            else setStatus(AttendanceStatus.SUCCESS);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleGrantPermission = () => {
    setStatus(AttendanceStatus.SCANNING);
    // Auto-advance scanning after 2s
    setTimeout(() => {
      setStatus(AttendanceStatus.VERIFYING);
    }, 2000);
  };

  const renderContent = () => {
    switch (status) {
      case AttendanceStatus.PERMISSION_NEEDED:
        return (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 text-center animate-in fade-in duration-500">
            <div className="w-full flex justify-center mb-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 size-64 bg-primary/10 rounded-full flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary text-[120px]">location_on</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 max-w-xs mx-auto mb-10">
              <h2 className="text-[#0d141c] dark:text-white tracking-tight text-[28px] font-bold leading-tight">Verify Your Presence</h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                To mark your attendance, we need to confirm you are in the classroom. Please enable location access to verify your proximity.
              </p>
            </div>
            <div className="w-full max-w-sm flex flex-col gap-3">
              <button onClick={handleGrantPermission} className="flex w-full items-center justify-center rounded-xl h-14 bg-primary hover:bg-blue-600 text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                Enable Location Access
              </button>
              <button onClick={onClose} className="flex w-full items-center justify-center rounded-xl h-12 text-slate-500 dark:text-slate-400 font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                Skip for now
              </button>
            </div>
            <div className="mt-8 flex items-start gap-3 bg-white dark:bg-white/5 p-3 rounded-lg border border-slate-100 dark:border-white/10 max-w-sm text-left">
              <span className="material-symbols-outlined text-primary text-[20px] pt-0.5">lock</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Privacy First:</span> We only access location when you tap 'Scan'. No background tracking occurs.
              </p>
            </div>
          </div>
        );

      case AttendanceStatus.SCANNING:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900">
             <div className="relative w-64 h-64">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-[5px] border-l-[5px] border-primary rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-10 h-10 border-t-[5px] border-r-[5px] border-primary rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[5px] border-l-[5px] border-primary rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[5px] border-r-[5px] border-primary rounded-br-xl" />
                <div className="absolute left-[10%] w-[80%] h-[2px] bg-primary shadow-[0_0_8px_#0d7ff2] animate-scan rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="material-symbols-outlined text-white text-5xl opacity-30">qr_code_scanner</span>
                </div>
             </div>
             <p className="text-white mt-12 text-lg font-medium">Scanning QR code...</p>
          </div>
        );

      case AttendanceStatus.VERIFYING:
        return (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="relative flex items-center justify-center mb-10">
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
              <div className="absolute -inset-4 rounded-full bg-primary/10 animate-pulse-slow"></div>
              <div className="relative flex items-center justify-center bg-white dark:bg-slate-800 rounded-full size-24 shadow-xl border border-slate-100 dark:border-slate-700 z-10">
                <span className="material-symbols-outlined text-primary text-5xl animate-pulse">location_on</span>
              </div>
            </div>
            <h1 className="text-slate-900 dark:text-white text-[28px] font-bold">Verifying location...</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-[280px] mx-auto mt-4">
              Checking your GPS coordinates against the classroom perimeter. Please stay within range.
            </p>
            <div className="mt-12 w-32 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-primary animate-shimmer w-1/2 rounded-full" />
            </div>
          </div>
        );

      case AttendanceStatus.SUCCESS:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500">
            <div className="relative mb-10 flex items-center justify-center">
              <div className="absolute h-36 w-36 rounded-full bg-primary/5"></div>
              <div className="absolute h-28 w-28 rounded-full bg-primary/15"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/30 z-10">
                <span className="material-symbols-outlined text-5xl text-white filled">check</span>
              </div>
            </div>
            <h1 className="text-[#0d141c] dark:text-white text-3xl font-extrabold mb-2">Attendance Marked</h1>
            <p className="text-slate-500 mb-10">{new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            <div className="w-full max-w-sm rounded-xl overflow-hidden bg-slate-900 relative h-64 group">
               <img src={course.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2000ms]" alt="Course" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-5 flex flex-col justify-end text-left">
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-[16px] filled">verified</span>
                    Confirmed
                  </span>
                  <p className="text-white text-2xl font-bold">{course.code}: {course.name}</p>
                  <div className="h-px w-full bg-white/20 my-3" />
                  <p className="text-white/90 font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                    {course.room}
                  </p>
               </div>
            </div>
            <button onClick={onClose} className="w-full max-w-sm mt-8 h-14 bg-primary hover:bg-primary/90 rounded-xl text-white font-bold transition-all shadow-lg active:scale-95">Done</button>
          </div>
        );

      case AttendanceStatus.ERROR_LOCATION:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
             <div className="relative size-64 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-200">
                   <img src="https://picsum.photos/400/400" className="w-full h-full object-cover opacity-40 grayscale" alt="Map" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative flex flex-col items-center">
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg border border-red-100">
                         <span className="material-symbols-outlined text-red-500 text-5xl">location_off</span>
                      </div>
                      <div className="mt-4 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Out of Range</div>
                   </div>
                </div>
             </div>
             <h1 className="text-slate-900 dark:text-white text-2xl font-bold mb-3">Outside Class Area</h1>
             <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs">You must be within the classroom vicinity to mark your attendance.</p>
             <button onClick={() => setStatus(AttendanceStatus.VERIFYING)} className="w-full max-w-sm h-14 bg-primary text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">refresh</span>
                Retry Location Check
             </button>
             <button onClick={onClose} className="mt-4 text-primary font-medium">Cancel and Go Back</button>
          </div>
        );

      case AttendanceStatus.ERROR_EXPIRED:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
             <div className="relative w-32 h-32 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center border border-red-100 mb-8">
                <span className="material-symbols-outlined text-red-500 text-6xl">timer_off</span>
             </div>
             <h1 className="text-slate-900 dark:text-white text-2xl font-bold mb-2">QR Code Expired</h1>
             <p className="text-slate-500 mb-10 max-w-[280px]">This code is no longer valid. QR codes for attendance refresh every 30 seconds.</p>
             <button onClick={() => setStatus(AttendanceStatus.SCANNING)} className="w-full max-w-sm h-12 bg-primary text-white font-bold rounded-lg mb-3">Try Scanning Again</button>
             <button onClick={onClose} className="text-primary font-medium">Cancel</button>
          </div>
        );

       case AttendanceStatus.ALREADY_MARKED:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative w-48 h-48 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <div className="bg-primary/10 p-10 rounded-full">
                <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
              </div>
            </div>
            <h1 className="text-slate-900 dark:text-white text-2xl font-bold mb-3">Attendance Already Marked</h1>
            <p className="text-slate-500 text-sm max-w-[320px] mb-8">No need to scan again. Your presence for this session has already been recorded in the system.</p>
            <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-start gap-4 text-left">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">school</span>
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold">{course.code}: {course.name}</h3>
                <p className="text-slate-500 text-xs mt-1">Recorded today at <span className="font-semibold text-slate-700 dark:text-slate-300">09:15 AM</span></p>
              </div>
            </div>
            <button onClick={onClose} className="w-full max-w-sm mt-12 h-12 bg-primary text-white font-bold rounded-xl shadow-lg">Back to Dashboard</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden">
      <header className="flex items-center p-4 sticky top-0 bg-transparent z-50">
        <button onClick={onClose} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        {status !== AttendanceStatus.PERMISSION_NEEDED && status !== AttendanceStatus.SUCCESS && (
          <h2 className="flex-1 text-center font-bold text-slate-900 dark:text-white pr-10">Attendance Check-in</h2>
        )}
      </header>
      {renderContent()}
    </div>
  );
};

export default AttendanceFlow;
