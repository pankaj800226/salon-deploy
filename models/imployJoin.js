import mongoose, { model } from "mongoose";

const imployJoinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true
    },
    

    status: {
        type: String,
        enum: ['waiting', 'conform', 'cancel'],
        default: 'waiting'
    }
}, { timestamps: true })

export const imployeModel = model("inployJoin", imployJoinSchema)