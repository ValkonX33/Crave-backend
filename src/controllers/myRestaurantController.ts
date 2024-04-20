import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import  cloudinary from "cloudinary"
import mongoose from "mongoose";


const getMyRestaurant = async (req:Request, res:Response)=>{
    try{
        const restaurant = await Restaurant.findOne({user: req.userId})
        if(!restaurant){
            return res.status(404).json({message:"restaurant not found"})
        }
        res.json(restaurant)
    }catch(error){
        console.log("error", error)
        res.status(500).json({message:"Error fetching restaurant"})
    }
}


const updateMyRestaurant = async (req:Request,res:Response)=>{

    try{
        const resturant = await Restaurant.findOne({user: req.userId})
        if(!resturant){
            return res.status(404).json({message: "restaurant not found"})}

            resturant.restaurantName = req.body.restaurantName
            resturant.city = req.body.city
            resturant.country = req.body.country
            resturant.deliveryPrice = req.body.deliveryPrice
            resturant.estimatedDeliveryTime = req.body.estimatedDeliveryTime
            resturant.cuisines = req.body.cuisines
            resturant.menuItems = req.body.menuItems
            resturant.lastUpdated = new Date()

            if(req.file){
                const imageUrl = await uploadImage(req.file as Express.Multer.File) 
                resturant.imageUrl = imageUrl
            }

            await resturant.save()
            res.status(200).send(resturant)
    }catch(error){
    console.log("error", error)
    res.status(500).json({messsage:"Something went wrong"})

    }


}   




const createMyRestaurant = async (req:Request, res:Response)=>{

    try{

        //Check if user already have a Restaurant in his account (One user can have only one Restaurant)
        
        const existingRestaurant = await Restaurant.findOne({user:req.userId})

        if(existingRestaurant){
            return res.status(409).json({message:"User Restaurant already exists"})
        }

        // Creating a base64 image from the Image Buffer (Where it is stored as object)
        const image = req.file as Express.Multer.File

        // const base64Image = Buffer.from(image.buffer).toString("base64")
        // const dataURI = `data:${image.mimetype};base64,${base64Image}`
        // //Uploading on Cloudinary
        // const uploadRespose = await cloudinary.v2.uploader.upload(dataURI)
        const imageUrl = await uploadImage(req.file as Express.Multer.File)
        const restaurant = new Restaurant(req.body)
        restaurant.imageUrl = imageUrl
        restaurant.user = new mongoose.Types.ObjectId(req.userId)
        restaurant.lastUpdated = new Date()
        await restaurant.save()

        res.status(201).send(restaurant)
        
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }

}

const uploadImage = async (file:Express.Multer.File)=>{
    const image =  file 
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataURI = `data:${image.mimetype};base64,${base64Image}`
    //Uploading on Cloudinary
    const uploadRespose = await cloudinary.v2.uploader.upload(dataURI)
    return uploadRespose.url 

}

export default {
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant
}