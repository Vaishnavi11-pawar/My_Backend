import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
    usename: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        index: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    fullname: {
        type:String,
        required: true,
        trim:true,
        index: true
    },
    avatar: {
        type: String,   //coludinary url:  we are going to use this..it  works like if we upload images or videos it make url of it and give us url
        required: true,
    },
    coverImage: {
       type: String     //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [ true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}   //customized function for checking the password is matching or not

userSchema.methods.generateAccessToken = function() {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )   
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    ) 
}

export const User = mongoose.model("User", userSchema)