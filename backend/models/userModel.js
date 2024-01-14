const mongoose= require('mongoose');
const emailValidate=require('email-validator');
const bcrypt= require('bcrypt');


const db_link='mongodb+srv://robinsinghsankalp:robinkum@cluster0.agvoh7i.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidate.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate: function(){
            return this.password==this.confirmPassword;
        }
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    },
    profileImage:{
        type: String,
        default:'img/users/default.jpeg'
    },
    resetToken: String
});


userSchema.pre('save', function(){
    this.confirmPassword=undefined;
});

userSchema.methods.createResetToken = function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password, confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}
const userModel=mongoose.model('userModel', userSchema);

module.exports=userModel;