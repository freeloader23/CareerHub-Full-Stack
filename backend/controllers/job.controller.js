import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to create job.", success: false });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const type = req.query.type || "";
        const experience = req.query.experience || "";
        const salary = req.query.salary || "";

        const query = {};

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ];
        }

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        if (type) {
            query.jobType = { $regex: type, $options: "i" };
        }

        if (experience) {
            query.experienceLevel = { $regex: experience, $options: "i" };
        }

        if (salary) {
            const salaryRange = Number(salary);
            // salary is expected as an upper bound e.g. 50k => 50k/1000? The UI can send a numeric cap.
            if (!Number.isNaN(salaryRange)) {
                query.salary = { $lte: salaryRange };
            }
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to fetch jobs.", success: false });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            populate: {
                path: 'applicant'
            }
        }).populate({
            path: 'company'
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to fetch job.", success: false });
    }
}
// candidate saved jobs
export const saveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found.', success: false });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.', success: false });
        }
        if (user.savedJobs.some(savedId => savedId.toString() === jobId)) {
            return res.status(409).json({ message: 'Job already saved.', success: false });
        }
        user.savedJobs.push(jobId);
        await user.save();
        return res.status(201).json({ message: 'Job saved successfully.', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to save job.', success: false });
    }
};

export const unsaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.', success: false });
        }
        const before = user.savedJobs.length;
        user.savedJobs = user.savedJobs.filter(savedId => savedId.toString() !== jobId);
        if (user.savedJobs.length === before) {
            return res.status(404).json({ message: 'Saved job not found.', success: false });
        }
        await user.save();
        return res.status(200).json({ message: 'Job removed from saved jobs.', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to unsave job.', success: false });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({ path: 'savedJobs', populate: { path: 'company' } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.', success: false });
        }
        return res.status(200).json({ savedJobs: user.savedJobs, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unable to load saved jobs.', success: false });
    }
};
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to fetch admin jobs.", success: false });
    }
}
