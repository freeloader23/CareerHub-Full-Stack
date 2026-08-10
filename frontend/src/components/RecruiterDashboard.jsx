import React from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">CareerHub Recruiter Console</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">Recruiter Dashboard</h1>
          </div>
          <Button asChild className="bg-slate-900 hover:bg-slate-800">
            <Link to="/admin/jobs/create">Post a Job</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <article className="rounded-2xl border border-slate-200 p-6">
            <div className="text-xs uppercase tracking-wide text-slate-500">Company Profile</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">Setup</div>
          </article>
          <article className="rounded-2xl border border-slate-200 p-6">
            <div className="text-xs uppercase tracking-wide text-slate-500">Open Jobs</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">Live</div>
          </article>
          <article className="rounded-2xl border border-slate-200 p-6">
            <div className="text-xs uppercase tracking-wide text-slate-500">Applicants</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">Track</div>
          </article>
          <article className="rounded-2xl border border-slate-200 p-6">
            <div className="text-xs uppercase tracking-wide text-slate-500">Recruiter</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">{user?.fullname || 'CareerHub'}</div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
