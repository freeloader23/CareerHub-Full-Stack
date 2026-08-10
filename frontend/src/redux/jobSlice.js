import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        savedJobs:[],
        searchedQuery:"",
        jobsLoading: false,
        jobsError: "",
        filter: {
            keyword: "",
            location: "",
            type: "",
            experience: "",
            salary: ""
        }
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSavedJobs:(state,action) => {
            state.savedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setJobFilters:(state,action) => {
            state.filter = { ...state.filter, ...action.payload };
        },
        setJobsLoading:(state,action) => {
            state.jobsLoading = action.payload;
        },
        setJobsError:(state,action) => {
            state.jobsError = action.payload;
        }
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSavedJobs,
    setSearchedQuery,
    setJobFilters,
    setJobsLoading,
    setJobsError
} = jobSlice.actions;
export default jobSlice.reducer;