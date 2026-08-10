import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const Job = ({job}) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const saveToggleHandler = async () => {
        try {
            if (isSaved) {
                const res = await axios.delete(`${JOB_API_END_POINT}/${job._id}/save`, { withCredentials: true });
                if (res.data.success) {
                    setIsSaved(false);
                    toast.success(res.data.message);
                }
            } else {
                const res = await axios.post(`${JOB_API_END_POINT}/${job._id}/save`, {}, { withCredentials: true });
                if (res.data.success) {
                    setIsSaved(true);
                    toast.success(res.data.message);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Unable to update saved jobs.');
        }
    }
    
    return (
        <div className='p-5 rounded-2xl shadow-sm bg-white border border-slate-200'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-slate-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button onClick={saveToggleHandler} variant={isSaved ? 'default' : 'outline'} className="rounded-full" size="icon">
                    <Bookmark className={isSaved ? 'fill-current' : ''} />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button onClick={saveToggleHandler} className={isSaved ? 'bg-slate-900' : 'bg-[#7209b7]'}>{isSaved ? 'Saved' : 'Save For Later'}</Button>
            </div>
        </div>
    )
}

export default Job