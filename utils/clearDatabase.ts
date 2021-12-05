import User from "../models/user.model";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" })
// @ts-ignore
let db: string = process.env.DB_URI;

async function deleteUsers(): Promise<any>{
    return User.deleteMany({});
}

// @ts-ignore
mongoose.connect(db, ()=>{
    switch (process.argv[2]){
        case "--users":
            deleteUsers().then(r => console.log("Users delete."));
            break;
    }
});



