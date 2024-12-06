import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const login = async(req, res) => {
    try {
        const {username,password}=req.body
        const user=await User.findOne({username})
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        
        if(user || !isPasswordCorrect){       
           return res.status(400).json({error:"Invalid Username or Password"})

        }
        generateTokenAndSetCookie(newUser._id,res)
        
        res.status(201).json({
            _id : user._id, 
            fullName : user.fullname,
            username : user.username,
            profilepic :user.profilepic
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
        
    }
}
export const signup = async(req, res) => {
try {
    const {fullname,username,password,confirmpassword,gender}=req.body;
    if(password!==confirmpassword){
        return res.status(400).json({error:"password dont match"})
    }
    const user=await User.findOne({username})
    if(user){
        return res.status(400).json({error:"username already exists"})
    }

    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password,salt)
    const boyProfilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser=new User({
        fullname,
        username,
        password : hashPassword,
        gender,
        profilepic:gender === "male" ? boyProfilepic : girlProfilepic
    })
    if(newUser){
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();
        res.status(201).json({
            _id : newUser._id, 
            fullName : newUser.fullname,
            username : newUser.username,
            profilepic :newUser.profilepic
        })

    }
   
} catch (error) {
    console.log("error",error)
    res.status(500).json({error:"Internal Server Error"})
}    
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxage:0});
        res.status(200).json({message:"Logged out sucessfully"})
    } catch (error) {
        console.log("Error in logout controller")
        res.status(500).json({error:"Internal Server Error"})
        
    }
}