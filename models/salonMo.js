import mongoose from 'mongoose';


const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    number: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    selectOption: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['waiting', 'booked', 'cancel'],
        default: 'waiting'
    }
}, { timestamps: true })

export const salonModel = mongoose.model('shop', shopSchema)