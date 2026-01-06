import React, { useState, useEffect } from 'react';

interface CourseRequest {
  _id: string;
  lecturerName: string;
  courseName: string;
  courseCode: string;
  reason?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

const AdminCourses: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState<CourseRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/admin/course-requests');
      const data = await res.json();
      if (data.requests) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch('/api/admin/course-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status }),
      });

      if (res.ok) {
        // Optimistic update
        setRequests(prev => prev.map(req => 
          req._id === requestId ? { ...req, status } : req
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.courseName.toLowerCase().includes(search.toLowerCase()) || 
                          req.courseCode.toLowerCase().includes(search.toLowerCase()) ||
                          req.lecturerName.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'All') return matchesSearch;
    if (filter === 'Pending') return matchesSearch && req.status === 'PENDING';
    if (filter === 'Approved') return matchesSearch && req.status === 'APPROVED';
    if (filter === 'Rejected') return matchesSearch && req.status === 'REJECTED';
    
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-slate-800 shadow-sm z-10 sticky top-0">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <button className="text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Courses</h1>
            </div>
          <button className="text-primary hover:bg-blue-50 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Search by name or code..." 
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-700 border-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Course Requests List */}
      <div className="p-4 flex flex-col gap-3 pb-24 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
            <p>No requests found</p>
          </div>
        ) : (
          filteredRequests.map(req => (
            <div key={req._id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex flex-col gap-3 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    req.status === 'PENDING' ? 'bg-amber-100 text-amber-600' :
                    req.status === 'APPROVED' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <span className="material-symbols-outlined text-2xl">
                      {req.status === 'PENDING' ? 'pending_actions' :
                       req.status === 'APPROVED' ? 'check_circle' : 'cancel'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase">{req.courseCode}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        req.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                        req.status === 'APPROVED' ? 'bg-green-50 text-green-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{req.courseName}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-4 h-4 rounded-full bg-slate-200 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${req.lecturerName}&background=random`} alt="" />
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Requested by {req.lecturerName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {req.reason && (
                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold block text-xs mb-1 text-slate-400 uppercase">Reason</span>
                  "{req.reason}"
                </div>
              )}

              {req.status === 'PENDING' && (
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={() => handleStatusUpdate(req._id, 'REJECTED')}
                    className="flex-1 h-10 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                    Reject
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(req._id, 'APPROVED')}
                    className="flex-1 h-10 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                  >
                    <span className="material-symbols-outlined text-lg">check</span>
                    Approve
                  </button>
                </div>
              )}
              
              <div className="flex justify-end text-xs text-slate-400 mt-1">
                {new Date(req.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
