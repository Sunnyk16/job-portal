import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userID = req.user;
    const jobId = req.params.user ;

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

    const job = await Job.findById(jobId );
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    // // create application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userID,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({ message: "Job Applied Successfully" });
  } catch (error) {
    console.log(error);
  }
};

// get all applications
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user;
    // console.log(userId);
    
    const application = await Application.find({ applicant:userId})
      .sort({ created: -1 })
      .populate({
        path: "job",
        options: { sort: { created: -1 } },
        populate: { path: "company", options: { createdAt: -1 } },
      });
    if (!application) {
      return res.status(400).json({ message: "No applications found" });
    }
    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.log(error);
  }
};

// get applicants applied for the job

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params._id || req.params.id;
    console.log(jobId);
    
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate:{path:"applicant",options:{sort:{createdAt:-1}}}
    });
    if (!job) {
      return res.status(400).json({ message: "No applications found",success:false });

    }
    return res.status(200).json({ job, success: true });

  } catch (error) {
    console.log(error);
  }
};

// upadte 
export const updateStatus =async(req,res)=>{

    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({message:"Status is required"})
        }
        // find application by application id

        const application=await Application.findById({_id:applicationId});
        if(!application){
            return res.status(400).json({message:"Application not found",success:false})
        }

        application.status=status;
        await application.save();
        return res.status(200).json({message:"Status updated successfully",success:true})
        
    } catch (error) {
        console.log(error);
        
        
    }
}
