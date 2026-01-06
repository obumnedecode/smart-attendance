
import React, { useState } from 'react';
import { User, Course } from '../types';
import { GoogleGenAI } from "@google/genai";

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  onStartAttendance: (course: Course) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout, onStartAttendance }) => {
  const [showAiHelp, setShowAiHelp] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const currentClass: Course = {
    id: 'cs101',
    code: 'CS101',
    name: 'Intro to Algorithms',
    room: 'Room 304',
    time: '09:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400'
  };

  const askAiAssistant = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "The student is having trouble with the attendance app. Give them 3 short, encouraging troubleshooting tips for GPS or QR scanning in a professional tone.",
        config: { systemInstruction: "You are a helpful academic assistant for the Smart Attendance Pro app." }
      });
      setAiResponse(response.text || "Try moving closer to the lecturer or toggling your GPS.");
    } catch (err) {
      setAiResponse("Please ensure you have a stable connection and try scanning again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-slate-50 dark:bg-background-dark shadow-2xl">
      <div className="flex items-center px-6 py-4 justify-between bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-30 sticky top-0 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl font-bold">qr_code_2</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-extrabold tracking-tight">ProCheck</h2>
        </div>
        <button onClick={onLogout} className="flex items-center justify-center rounded-full size-10 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>

      <div className="flex flex-col flex-1 px-5 pb-6">
        <div className="flex flex-col items-center pt-8 pb-6 text-center">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4 animate-pulse">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active Session</p>
          </div>
          <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">{currentClass.code}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-base font-medium mt-1">{currentClass.name}</p>
        </div>

        <div 
          onClick={() => onStartAttendance(currentClass)}
          className="relative w-full aspect-[4/5] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 cursor-pointer group transition-all duration-500 hover:scale-[1.01]"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[3000ms] group-hover:scale-110" 
            style={{ backgroundImage: `url(${currentClass.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 border-[1px] border-white/20 rounded-3xl" />
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-[0_0_15px_rgba(13,127,242,0.5)]" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-[0_0_15px_rgba(13,127,242,0.5)]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-[0_0_15px_rgba(13,127,242,0.5)]" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-[0_0_15px_rgba(13,127,242,0.5)]" />
              <div className="absolute left-[5%] w-[90%] h-[3px] bg-primary shadow-[0_0_15px_#0d7ff2] animate-scan rounded-full" />
              <span className="material-symbols-outlined text-white text-6xl opacity-20">qr_code_scanner</span>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 w-full px-8">
            <div className="flex items-center justify-center gap-10">
              <div className="size-16 rounded-full bg-white flex items-center justify-center text-primary shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl font-bold">camera_alt</span>
              </div>
            </div>
            <p className="text-center text-white/80 font-bold mt-6 tracking-wide uppercase text-xs">Tap frame to scan</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">map</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Location</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{currentClass.room}</p>
            </div>
            <span className="text-emerald-500 material-symbols-outlined filled text-xl">check_circle</span>
          </div>
        </div>
      </div>

      {/* AI Help Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => { setShowAiHelp(!showAiHelp); if(!aiResponse) askAiAssistant(); }}
          className="size-14 rounded-full bg-slate-900 dark:bg-primary flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">auto_awesome</span>
        </button>
        
        {showAiHelp && (
          <div className="absolute bottom-16 right-0 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-5 animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">smart_toy</span>
                AI Support
              </h4>
              <button onClick={() => setShowAiHelp(false)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined text-lg">close</span></button>
            </div>
            {isAiLoading ? (
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{aiResponse}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
