import mongoose from 'mongoose';



const warehouseSchema = new mongoose.Schema({
    idofwarehouse: {
        type: String,
        required: true,
        unique: true
    },
    warehousename: {
        type: String,
        required: true
    },
    location: { 
        type: String,
        required: true
    },
    region: { 
        type: String,
        required: true
    },
    contactnumber: { 
        type: Number,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    totalcapacity: { 
        type: Number,
        required: true
    },
    distance: { 
        type: Number,
        required: true
    },
    managername: { 
        type: String,
        required: true
    }
},{ timestamps: true });

export default mongoose.model('Warehouse', warehouseSchema);