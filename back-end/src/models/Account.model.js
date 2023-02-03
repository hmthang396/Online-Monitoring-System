const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const accountSchema = mongoose.Schema({
    fullname: {
        type:String,
        trim:true,
        require:true,
    },
    email:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    role:{
        type:String,
        enum:['Admin','Customer'],
        default:'Customer',
        require:true
    },
    pic:{
        type: String,
        trim:true,
        default :"user.jpg"
    },
    project:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Project",
    }],
    permission:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"RoleAccount",
    },
    refreshToken:{
        type: String,
    },
    status:{
        type:mongoose.Schema.Types.Boolean,
        default: false
    }
},
{
    timestamps : true   
});

accountSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

accountSchema.pre("save",async function(next){
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(9);
    this.password = await bcrypt.hash(this.password, salt);
})

const Account = mongoose.model("Account",accountSchema);
module.exports = Account;