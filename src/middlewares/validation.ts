
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