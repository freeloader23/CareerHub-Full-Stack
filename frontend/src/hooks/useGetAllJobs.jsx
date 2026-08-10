import { setAllJobs, setJobsError, setJobsLoading } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, filter } = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                dispatch(setJobsLoading(true));
                dispatch(setJobsError(''));
                const params = new URLSearchParams();
                if (searchedQuery) params.set('keyword', searchedQuery);
                if (filter.keyword) params.set('keyword', filter.keyword);
                if (filter.location) params.set('location', filter.location);
                if (filter.type) params.set('type', filter.type);
                if (filter.experience) params.set('experience', filter.experience);
                if (filter.salary) params.set('salary', filter.salary);

                const res = await axios.get(`${JOB_API_END_POINT}/get?${params.toString()}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                dispatch(setJobsError(error?.response?.data?.message || 'Unable to load job results.'));
            } finally {
                dispatch(setJobsLoading(false));
            }
        }
        fetchAllJobs();
    },[dispatch, searchedQuery, filter])
}

export default useGetAllJobs