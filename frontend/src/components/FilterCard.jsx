import React, { useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { setJobFilters } from '@/redux/jobSlice';

const FilterCard = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((store) => store.job);
    const [localFilter, setLocalFilter] = useState(filter);

    const filterOptions = useMemo(() => [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Internship', label: 'Internship' }
    ], []);

    const updateFilter = (event) => {
        const { name, value } = event.target;
        setLocalFilter(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        dispatch(setJobFilters(localFilter));
    };

    return (
        <aside className='w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-lg text-slate-900'>CareerHub Search</h2>
                <span className='text-xs text-slate-500'>Filters</span>
            </div>
            <div className='space-y-4 mt-5'>
                <div>
                    <Label htmlFor='keyword' className='text-xs uppercase tracking-wide'>Keyword / Role</Label>
                    <Input id='keyword' name='keyword' value={localFilter.keyword} onChange={updateFilter} placeholder='React Developer' className='mt-1' />
                </div>
                <div>
                    <Label htmlFor='location' className='text-xs uppercase tracking-wide'>Location</Label>
                    <Input id='location' name='location' value={localFilter.location} onChange={updateFilter} placeholder='Delhi' className='mt-1' />
                </div>
                <div>
                    <Label htmlFor='type' className='text-xs uppercase tracking-wide'>Job Type</Label>
                    <select id='type' name='type' value={localFilter.type} onChange={updateFilter} className='w-full mt-1 rounded-md border border-slate-200 px-3 py-2 text-sm'>
                        <option value=''>All Job Types</option>
                        {filterOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </div>
                <div>
                    <Label htmlFor='experience' className='text-xs uppercase tracking-wide'>Experience Level</Label>
                    <select id='experience' name='experience' value={localFilter.experience} onChange={updateFilter} className='w-full mt-1 rounded-md border border-slate-200 px-3 py-2 text-sm'>
                        <option value=''>Any Experience</option>
                        <option value='Fresher'>Fresher</option>
                        <option value='Junior'>Junior</option>
                        <option value='Mid'>Mid</option>
                        <option value='Senior'>Senior</option>
                    </select>
                </div>
                <div>
                    <Label htmlFor='salary' className='text-xs uppercase tracking-wide'>Salary Limit</Label>
                    <Input id='salary' name='salary' type='number' value={localFilter.salary} onChange={updateFilter} placeholder='e.g. 900000' className='mt-1' />
                </div>
                <Button className='w-full' onClick={applyFilters}>Search Jobs</Button>
            </div>
        </aside>
    )
}

export default FilterCard;