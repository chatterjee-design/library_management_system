import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
  role:{
    type: String,
    enum: ['USER', 'ADMIN']
  }
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
    }
}

const User = model('User', userSchema);

export default User;