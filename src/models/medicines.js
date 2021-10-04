const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Medicines = new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    medico:{
        type: Boolean,
        required: true
    },
    farmaceutico:{
        type: Boolean, 
        required: true
    },
    veterinario:{
        type: Boolean,
        required: true
    },
    nutricionista:{
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("Medicines", Medicines)
 