// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})


connectDB()



// 1st approach of the database connectivity. we use iife for immediately invoked function
// and by assuming that db is at another continent we use async await
// and for not getting error we always use try and catch
// we use express here because if sometime it is unable to find the error by the db express/app can find ir
/*
import express from "express"
const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.log("ERROR", error);
        throw err
    }
}) ()
*/