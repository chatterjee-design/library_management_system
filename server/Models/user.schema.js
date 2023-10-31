import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from "crypto";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select : false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  role:{
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
},
{
  timestamps: true,
});

//hashing the password
userSchema.pre('save',  async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare the password against the hashed password
userSchema.methods = {
    comparePassword: async function(plainPassword){
        return await bcrypt.compare(plainPassword, this.password)
    },

    //generate a jwt token for payload
    generateJWTToken: async function(){
        return await jwt.sign(
            {id : this.id, secret : this.secret, roles : this.roles, email : this.email},
            process.env.SECRET_KEY,{
                expiresIn: "7d"
            }
        )
    },
    generateResetToken: async function(){
      // creating a random token using node's built-in crypto module
      const resetToken = crypto.randomBytes(16).toString("hex");
    
      //hash the generated resetToken with sha256 algorithm and store it into db
      this.forgotPasswordToken = crypto // or we can just save the resetToken
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
 
      // Adding forgot password expiry to 10 minutes
      this.forgotPasswordExpiry = Date.now() + 17 * 60 * 1000;
      
     await this.save();
     return resetToken;
     
    },
}

const User = model('User', userSchema);

export default User;