import mongoose, { model } from "mongoose";

const supportSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },


}, { timestamps: true })

export const supportModel = model("support", supportSchema)