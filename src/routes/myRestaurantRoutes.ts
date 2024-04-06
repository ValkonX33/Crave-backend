import express from "express"
import myRestaurantController from "../controllers/myRestaurantController"
import multer from "multer"
const router = express.Router()

const storage = multer.memoryStorage()
const uplaod = multer({
    storage:storage,
    limits:{
        fileSize: 5*1024*1024, //5mb
    }
})

//   /api/my/resturant 

router.post("/", uplaod.single("imageFile"),  myRestaurantController.createMyRestaurant)

export default router