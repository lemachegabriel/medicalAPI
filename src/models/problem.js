const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const medicine = new Schema({
    name: {
        type : String,
    },
    _id : {
        type : String,
    }
})

const Problem = new Schema({
    name: {
        type : String,
        require: true,
    },
    medicines : [medicine],

    createdAt : {
        type : Date,
        default : Date.now(),
    }
});

mongoose.model("Problem", Problem)