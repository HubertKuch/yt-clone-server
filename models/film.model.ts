import { Schema, model } from "mongoose";
import Comment from "./comment.model";

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
        type: [Comment]
    },
});

const Film: object = model("Film", filmSchema);

export default Film;
