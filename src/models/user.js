const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs')

const favs = new Schema({
    name: {
        type: String,
    },
    _id : {
        type : String,
    }   
})

const UserSchema = new Schema({
    name: {
        type : String,
        require: true,
    },
    email: {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        select: false,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    job : {
        type: Number,
        required : true,
    },
    favorites: [favs]
});

UserSchema.pre('save', async function(next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();
})

mongoose.model("User", UserSchema)