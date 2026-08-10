import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, jobsLoading, jobsError } = useSelector(store => store.job);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5 flex-col md:flex-row'>
                    <div className='md:w-[300px]'>
                        <FilterCard />
                    </div>
                    {jobsLoading ? (
                        <div className='flex-1 min-h-[420px] flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600'>Loading jobs...</div>
                    ) : jobsError ? (
                        <div className='flex-1 min-h-[420px] flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-700'>{jobsError}</div>
                    ) : allJobs.length <= 0 ? (
                        <div className='flex-1 min-h-[420px] flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-600'>No jobs found for this CareerHub search.</div>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                {
                                    allJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}>
                                            <Job job={job} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs