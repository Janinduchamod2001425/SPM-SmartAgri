import mongoose from "mongoose";

const fertilizerSchema = new mongoose.Schema({
    fername:{
        type:String,
        required :true
    },
    ferdetails:{
        type:String,
        required :true
    },
    fertype:{
        type:String,
        required :true
    },
    fermade:{
        type:String,
        required :true
    }
})

export default mongoose.model("Fertilizer",fertilizerSchema);