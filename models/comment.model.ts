import { Schema, model } from "mongoose";

const commentSchema = new Schema({
   comment: {},
   userId: {},
});

const Comment: object = model("Comment", commentSchema);

export default Comment;
