
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationError = async (req:Request, res:Response, next:NextFunction)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){

            return res.status(400).json({ errors: errors.array() });
        }
        next()
}

export const validateMyRequest = [

    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("Address must be a stirng"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationError
]

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("Devilvery price must be a positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated delivery time must be a positive integer"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu items name is required"),
    body("menuItems.*price").isFloat({min:0}).notEmpty().withMessage("Menu item price is required and must be a positive number"),

    handleValidationError


]