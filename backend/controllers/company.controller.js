import {Company} from "../models/company.model.js"

export const registerCompany = async(req,res) =>{
    try {
        //craeting a comapnay
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            })
        }
    //finding the same company
        let company = await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message:"You can't add same company",
                success: false
            })
        }
        //company creating
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        //201 is for craetion
        return res.status(201).json({
            message:"Company resgistered successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getCompany = async (req,res) =>{
    try {
        const userId= req.id;//logged in user id 
        const companies = await Company.findOne({userId})
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

//get company by id
 export const getCompanyById= async (req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json
           ({ message:"Company not found",
            success: false})
        }

        return res.status(200).json({
            company,
            success :true
        })
    } catch (error) {
        
    }
 }

 export const updateCompany = async(req,res)=>{
    try {
        const {name, description, website, location}=req.body;
        const file = req.file;

        //cloudinary ayga


        const  updateData = {name, description, website, location}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})

        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success: false
            })
        }

        return res.status(202).json({
            message:"Company info updated",
            success:true
        })
        
    } catch ({error}) {
        console.log(error);
        
    }
 }