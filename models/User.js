const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const { type } = require('express/lib/response')

const UserSchema=new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['Admin','Member'],default:'Member'},
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    borrowedBooks:[{type:mongoose.Schema.Types.ObjectId,ref:"Book"}]
})

//hash ths password before saving the user
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
})

//Compare password method
UserSchema.method.comparePassword=async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}
module.exports=mongoose.model('User',UserSchema)