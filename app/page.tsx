'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import StudentDashboard from '../screens/StudentDashboard';
import LecturerDashboard from '../screens/LecturerDashboard';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AttendanceFlow from '../screens/AttendanceFlow';
import LecturerQRView from '../screens/LecturerQRView';
import { User, UserRole, AttendanceStatus, Course } from '../types';

const Home: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'LOGIN' | 'SIGNUP' | 'DASHBOARD' | 'ATTENDANCE_FLOW' | 'LECTURER_QR'>('LOGIN');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
          setCurrentScreen('DASHBOARD');
        }
      } catch (err) {
        console.error('Session check failed', err);
      }
    };
    checkSession();
  }, []);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    setCurrentScreen('DASHBOARD');
  }, []);

  const handleStartAttendance = useCallback((course: Course) => {
    setSelectedCourse(course);
    if (currentUser?.role === UserRole.LECTURER) {
      setCurrentScreen('LECTURER_QR');
    } else {
      setCurrentScreen('ATTENDANCE_FLOW');
    }
  }, [currentUser]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      setCurrentScreen('LOGIN');
    } catch (err) {
      console.error('Logout failed', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {currentScreen === 'LOGIN' && <Login onLogin={handleLogin} onSignUpClick={() => setCurrentScreen('SIGNUP')} />}
      {currentScreen === 'SIGNUP' && <SignUp onBackToLogin={() => setCurrentScreen('LOGIN')} />}
      
      {currentScreen === 'DASHBOARD' && currentUser?.role === UserRole.STUDENT && (
        <StudentDashboard 
          user={currentUser} 
          onStartAttendance={handleStartAttendance} 
          onLogout={handleLogout} 
        />
      )}

      {currentScreen === 'DASHBOARD' && currentUser?.role === UserRole.LECTURER && (
        <LecturerDashboard 
          user={currentUser} 
          onStartAttendance={handleStartAttendance}
          onLogout={handleLogout} 
        />
      )}

      {currentScreen === 'DASHBOARD' && currentUser?.role === UserRole.ADMIN && (
        <AdminDashboard 
          user={currentUser} 
          onLogout={handleLogout} 
        />
      )}

      {currentScreen === 'ATTENDANCE_FLOW' && selectedCourse && (
        <AttendanceFlow 
          course={selectedCourse} 
          onClose={() => setCurrentScreen('DASHBOARD')} 
        />
      )}

      {currentScreen === 'LECTURER_QR' && selectedCourse && (
        <LecturerQRView 
          course={selectedCourse} 
          onClose={() => setCurrentScreen('DASHBOARD')} 
        />
      )}
    </div>
  );
};

export default Home;
