import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onSignUpClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignUpClick }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: id, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      onLogin(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-center items-center bg-background-light dark:bg-background-dark p-4">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex w-full justify-center">
          <div className="w-24 h-24 overflow-hidden rounded-xl flex shadow-sm bg-primary/10 items-center justify-center">
             <span className="material-symbols-outlined text-primary text-5xl">school</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight text-center">
            Smart Attendance Portal
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal text-center">
            Access for Students & Lecturers
          </p>
          {error && (
            <div className="w-full bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mt-2">
              {error}
            </div>
          )}
        </div>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal">
              Email or Student ID
            </label>
            <div className="relative flex items-center">
              <input 
                className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary h-14 pl-11 text-base font-normal" 
                placeholder="Enter your email or ID" 
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <div className="absolute left-4 text-slate-400 flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal">
              Password
            </label>
            <div className="relative flex w-full flex-1 items-stretch rounded-lg shadow-sm">
              <input 
                className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary h-14 pl-11 pr-12 text-base font-normal" 
                placeholder="Enter your password" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute left-4 top-0 h-full text-slate-400 flex items-center justify-center pointer-events-none z-10">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <button 
                className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-primary transition-colors flex items-center justify-center bg-transparent z-10" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-primary hover:text-blue-600 text-sm font-medium transition-colors">
              Forgot Password?
            </button>
          </div>

          <button 
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-primary h-14 text-white text-base font-bold leading-normal hover:bg-blue-600 active:scale-[0.98] transition-all shadow-md mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="flex flex-col items-center gap-4 mt-4">
          <button onClick={onSignUpClick} className="text-slate-500 dark:text-slate-400 text-sm hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            Need help logging in? Create account
          </button>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
            <p className="text-slate-400 dark:text-slate-600 text-xs">v1.0.4</p>
            <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
