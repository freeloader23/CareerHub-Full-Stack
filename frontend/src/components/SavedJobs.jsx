import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const SavedJobs = () => {
  const { user } = useSelector((store) => store.auth);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/saved`, { withCredentials: true });
        if (res.data.success) {
          setSavedJobs(res.data.savedJobs);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Unable to load saved jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Saved Jobs</h1>
            <p className="text-sm text-slate-500 mt-2">Your shortlist for future applications.</p>
          </div>
          <span className="text-sm text-slate-500">{savedJobs.length} saved</span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 p-6 text-slate-500">Loading saved jobs...</div>
        ) : savedJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="font-semibold text-slate-900">No saved jobs yet</p>
            <p className="text-sm text-slate-500 mt-2">Save a role to keep it in your placement shortlist.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {savedJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
