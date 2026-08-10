import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, getSavedJobs, postJob, saveJob, unsaveJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/saved").get(isAuthenticated, getSavedJobs);
router.route("/:id/save").post(isAuthenticated, saveJob);
router.route("/:id/save").delete(isAuthenticated, unsaveJob);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;

