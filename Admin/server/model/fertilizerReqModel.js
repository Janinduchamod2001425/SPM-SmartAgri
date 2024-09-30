import mongoose from 'mongoose';



const fertilizerReqSchema = new mongoose.Schema({
    farmerid: {
        type: String,
        required: true,
        unique: true
    },
    fertilizertype: {
        type: String,
        required: true
    },
    quantity: { 
        type: Number,
        required: true
    },
    prioritylevel: { 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

export default mongoose.model('FertilizerReq', fertilizerReqSchema);