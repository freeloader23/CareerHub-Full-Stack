import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setApplicationStats } from '@/redux/applicationSlice';
import { Badge } from './ui/badge';

const CandidateAnalytics = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/stats`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setApplicationStats(res.data.stats));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [dispatch]);

  const analytics = [
    { label: 'Total Applications', value: stats.totalApplications || 0 },
    { label: 'Applied', value: stats.Applied || 0 },
    { label: 'Shortlisted', value: stats.Shortlisted || 0 },
    { label: 'Interviews', value: stats.Interviews || 0 },
    { label: 'Selected', value: stats.Selected || 0 },
    { label: 'Rejected', value: stats.Rejected || 0 }
  ];

  return (
    <section className="max-w-4xl mx-auto mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Application Overview</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">CareerHub Analytics</h2>
        </div>
        <Badge variant="outline" className="rounded-full text-slate-600">Live Dashboard</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-7">
        {analytics.map((item) => (
          <article key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-3xl font-bold text-slate-900">{item.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-2">{item.label}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CandidateAnalytics;
