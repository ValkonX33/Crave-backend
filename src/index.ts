import express, {Request, Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/myUserRoute"


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Database Connected"))


const app = express()
app.use(express.json())
app.use(cors())


// /api/my/user
app.get("/health",async (req:Request, res:Response)=>{
        res.send({message: "Health Ok!"})

} )
app.use("/api/my/user", myUserRoute)

app.listen(7000, ()=>{

        console.log("Server Stareted")
})