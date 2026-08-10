import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const statusClasses = {
    'Applied': 'bg-sky-100 text-sky-700',
    'Shortlisted': 'bg-blue-100 text-blue-700',
    'Technical Interview': 'bg-amber-100 text-amber-700',
    'HR Interview': 'bg-violet-100 text-violet-700',
    'Selected': 'bg-emerald-100 text-emerald-700',
    'Rejected': 'bg-rose-100 text-rose-700'
};

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>CareerHub application activity</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <span className='text-sm text-slate-500'>You haven't applied any job yet.</span>
                                </TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={statusClasses[appliedJob?.status] || 'bg-slate-100 text-slate-700'}>{appliedJob.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable