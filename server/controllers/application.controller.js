import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userID = req._id;
    const jobId = req.params._id;

    if (!jobId) {
      return res.status(400).json({ message: "Job Id is required" });
    }
    // return res.status(200).json({ message: "Job Applied Successfully" });
    // check if already applied for job

    const existingApplication = await Application.findOne({
      job: jobId,
      user: userID,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    // check if the job exists

    const job = await Job.findById({ jobId });
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }


    // // create application
    const newApplication =await Application.create({
        job: jobId,
        applicant: userID,
    })

    job.applications.push(newApplication._id)
    await job.save()

    return res.status(200).json({ message: "Job Applied Successfully" });

  } catch (error) {
    console.log(error);
  }
};

// get all applications
export const getAppliedJobs =async (req,res)=>{
    try {
        const userId =req._id;
        const application = Application.find({applicant:userId})
        .sort({created:-1}).populate({path:'job',
            path:'job',
            options:{sort:{created:-1}},
            populate:{path:'company'}

        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}
