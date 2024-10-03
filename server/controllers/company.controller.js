import  Company  from "../models/company.model.js";

// for company registration
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // comapany modal
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    // create company
    company = await Company.create({
      name: companyName,
      userId: req._id,
    });
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for company login

export const getComapny = async (req, res) => {
  try {
    const userId = req._id;
    const comapnies = await Company.find({ userId });
    if (!comapnies) {
      return res.status(400).json({
        message: "No company found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company found",
      success: true,
      data: comapnies,
    });
  } catch (error) {
    console.log(error);
  }
};

// get comapny by id

export const getComapnyById = async (req, res) => {
    try {
        const comapnyId =req.params.id;
        const comapny = await Company.findById(comapnyId);
        if(!comapny){
            return res.status(400).json({
                message: "No company found",
                success: false,
              });
        }
        return res.status(200).json({
            message: "Company found",
            success: true,
            data: comapny
          });
        
    } catch (error) {
        console.log(error);
        
    }
  };

  export const updateCompany = async (req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const file=req.file;

        // cloudinary will be addded here 

        const  updateData={name,description,website,location};
        const  comapany=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!comapany){
            return res.status(400).json({
                message: "No company found",
                success: false,
              });
        }
        return res.status(200).json({
            message: "Company updated",
            success: true,
            data: comapany
          });

        
    } catch (error) {
        console.log(error);
        
        
    }
  }

