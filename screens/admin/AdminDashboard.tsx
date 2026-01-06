import React, { useState } from 'react';
import { User } from '../../types';
import AdminHome from './AdminHome';
import AdminUsers from './AdminUsers';
import AdminCourses from './AdminCourses';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminTab = 'HOME' | 'USERS' | 'COURSES' | 'PROFILE';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('HOME');

  const renderContent = () => {
    switch (activeTab) {
      case 'HOME':
        return <AdminHome user={user} />;
      case 'USERS':
        return <AdminUsers />;
      case 'COURSES':
        return <AdminCourses />;
      case 'PROFILE':
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                <p className="text-slate-500 mb-6">{user.email}</p>
                
                <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
                >
                    <span className="material-symbols-outlined">logout</span>
                    Sign Out
                </button>
            </div>
        );
      default:
        return <AdminHome user={user} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="h-[80px] bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-around px-2 pb-2 relative z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        
        {/* Home */}
        <button 
            onClick={() => setActiveTab('HOME')}
            className={`flex flex-col items-center justify-center w-16 gap-1 ${activeTab === 'HOME' ? 'text-primary' : 'text-slate-400'}`}
        >
            <span className={`material-symbols-outlined ${activeTab === 'HOME' ? 'filled' : ''}`}>grid_view</span>
            <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Users */}
        <button 
            onClick={() => setActiveTab('USERS')}
            className={`flex flex-col items-center justify-center w-16 gap-1 ${activeTab === 'USERS' ? 'text-primary' : 'text-slate-400'}`}
        >
            <span className={`material-symbols-outlined ${activeTab === 'USERS' ? 'filled' : ''}`}>group</span>
            <span className="text-[10px] font-medium">People</span>
        </button>

        {/* Scan Button (Center) */}
        <div className="relative -top-6">
            <button className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
            </button>
        </div>

        {/* Courses */}
        <button 
            onClick={() => setActiveTab('COURSES')}
            className={`flex flex-col items-center justify-center w-16 gap-1 ${activeTab === 'COURSES' ? 'text-primary' : 'text-slate-400'}`}
        >
            <span className={`material-symbols-outlined ${activeTab === 'COURSES' ? 'filled' : ''}`}>book_2</span>
            <span className="text-[10px] font-medium">Courses</span>
        </button>

        {/* Profile */}
        <button 
            onClick={() => setActiveTab('PROFILE')}
            className={`flex flex-col items-center justify-center w-16 gap-1 ${activeTab === 'PROFILE' ? 'text-primary' : 'text-slate-400'}`}
        >
            <span className={`material-symbols-outlined ${activeTab === 'PROFILE' ? 'filled' : ''}`}>person</span>
            <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
