import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
        stats: {
            totalApplications: 0,
            Applied: 0,
            Shortlisted: 0,
            Interviews: 0,
            Selected: 0,
            Rejected: 0
        }
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        setApplicationStats:(state,action) => {
            state.stats = action.payload;
        }
    }
});
export const {setAllApplicants, setApplicationStats} = applicationSlice.actions;
export default applicationSlice.reducer;