import mongoose from "mongoose";

const pestSchema = new mongoose.Schema({
    pname:{
        type: String,
        required: true
    },
    ptype:{
        type: String,
        required: true
    },
    symptom:[{
        type: String,
        required: true
    }],
    treatment:[{
        type: String,
        required: true
    }],
    
})

export default mongoose.model("Pest", pestSchema);
   