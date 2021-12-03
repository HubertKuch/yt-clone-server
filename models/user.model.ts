import { model, Schema } from "mongoose"
import bcrypt from "bcrypt";

const userSchema: Schema = new Schema({
    name: {
        type: String,
        minlength: [8, "min username length is 8"],
        required: [true, "username is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: {
            validator: function (val: string){
                return !!val.match(/@/);
            },
            message: "Repeat email",
        },
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        minlength: [8, "Minimum password length is 8"],
        required: [true, "password is required"],
        validate: {
            validator: function (val: string){
                return !!val.match(/[A-Z]/);
            },
            message: "Pass must have min one capital character",
        },
        select: false,
    },
    subscriptions: {
        type: Number,
        default: 0,
    },
    passwordConfirm: String,
    isActivated: Boolean,
    photo: String,
});

userSchema.pre("save", function(next){
    console.log(`USER PREPARED TO SAVE: ${Date.now()}`);
    this.password = bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.post("save", function(doc){
    console.log(`USER ${doc.name} SAVED ${Date.now()}`)
});

userSchema.methods.verifyPassword = async function(bearerPassword, password){
    return !!(await bcrypt.compare(bearerPassword, password));
}

const UserModel = model("User", userSchema);

export default UserModel;
