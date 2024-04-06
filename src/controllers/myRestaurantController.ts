import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import  cloudinary from "cloudinary"
import mongoose from "mongoose";
const createMyRestaurant = async (req:Request, res:Response)=>{

    try{

        //Check if user already have a Restaurant in his account (One user can have only one Restaurant)
        
        const existingRestaurant = await Restaurant.findOne({user:req.userId})

        if(existingRestaurant){
            return res.status(409).json({message:"User Restaurant already exists"})
        }

        // Creating a base64 image from the Image Buffer (Where it is stored as object)
        const image = req.file as Express.Multer.File

        const base64Image = Buffer.from(image.buffer).toString("base64")
        const dataURI = `data:${image.mimetype};base64,${base64Image}`
        //Uploading on Cloudinary
        const uploadRespose = await cloudinary.v2.uploader.upload(dataURI)

        const restaurant = new Restaurant(req.body)
        restaurant.imageUrl = uploadRespose.url
        restaurant.user = new mongoose.Types.ObjectId(req.userId)
        restaurant.lastUpdated = new Date()
        await restaurant.save()

        res.status(201).send(restaurant)
        
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }

}
export default {
    createMyRestaurant
}