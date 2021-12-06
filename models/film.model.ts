import { Schema, model } from "mongoose";
import commentSchema from "./commentSchema";

const filmSchema = new Schema({
    title: {
        type: String,
        required: [true, "Film title is required"],
    },
    description: {
        type: String,
        default: "Film dont have description.",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"],
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: [commentSchema]
    },
});

const Film = model("Film", filmSchema);

export default Film;
