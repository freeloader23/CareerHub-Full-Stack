import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

const validStatuses = ['Applied', 'Shortlisted', 'Technical Interview', 'HR Interview', 'Selected', 'Rejected'];

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(409).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
            status: 'Applied',
            statusHistory: [{ status: 'Applied', changedAt: new Date() }]
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to submit application.', success: false });
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application || application.length === 0){
            return res.status(200).json({
                application: [],
                success:true
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to fetch applications.', success: false });
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        }
        if (job.created_by.toString() !== userId.toString()) {
            return res.status(403).json({
                message:'You are not authorized to view these applicants.',
                success:false
            })
        }
        const populatedJob = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        return res.status(200).json({
            job: populatedJob,
            success:true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to fetch applicants.', success: false });
    }
}
export const updateStatus = async (req,res) => {
    try {
        const { status, interviewDate, notes } = req.body;
        const applicationId = req.params.id;
        const userId = req.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Status is invalid.',
                success: false
            });
        }

        const application = await Application.findById(applicationId).populate('job');
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        if (application.job.created_by.toString() !== userId.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to update this application.',
                success: false
            });
        }

        const previousStatus = application.status;
        application.status = status;
        if (interviewDate) {
            application.interviewDate = new Date(interviewDate);
        }
        if (notes !== undefined) {
            application.notes = notes;
        }
        if (previousStatus !== status && !application.statusHistory.some(item => item.status === status && item.changedAt)) {
            application.statusHistory.push({ status, changedAt: new Date() });
        }
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true,
            application
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to update status.', success: false });
    }
}

export const getApplicationStats = async (req, res) => {
    try {
        const applicantId = req.id;
        const applications = await Application.find({ applicant: applicantId }).populate({ path: 'job' });
        const stats = {
            totalApplications: applications.length,
            Applied: 0,
            Shortlisted: 0,
            'Technical Interview': 0,
            'HR Interview': 0,
            Selected: 0,
            Rejected: 0
        };

        applications.forEach((application) => {
            if (stats[application.status] !== undefined) {
                stats[application.status] += 1;
            }
        });

        const interviews = stats['Technical Interview'] + stats['HR Interview'];

        return res.status(200).json({
            success: true,
            stats: {
                totalApplications: stats.totalApplications,
                Applied: stats.Applied,
                Shortlisted: stats.Shortlisted,
                Interviews: interviews,
                Selected: stats.Selected,
                Rejected: stats.Rejected
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to compute application statistics.', success: false });
    }
};