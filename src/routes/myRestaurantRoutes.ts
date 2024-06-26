import express from "express"
import myRestaurantController from "../controllers/myRestaurantController"
import multer from "multer"
import { jwtCheck, jwtParse } from "../middlewares/auth"
import { validateMyRestaurantRequest } from "../middlewares/validation"
const router = express.Router()

const storage = multer.memoryStorage()
const uplaod = multer({
    storage:storage,
    limits:{
        fileSize: 5*1024*1024, //5mb
    }
})

//   /api/my/resturant 
router.get("/", jwtCheck, jwtParse, myRestaurantController.getMyRestaurant)
router.post("/",uplaod.single("imageFile"), validateMyRestaurantRequest,  jwtCheck, jwtParse,    myRestaurantController.createMyRestaurant)
router.put("/",uplaod.single("imageFile"),validateMyRestaurantRequest,  jwtCheck, jwtParse, myRestaurantController.updateMyRestaurant) 



export default router

