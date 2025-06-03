/*
    Fields:
        questions: String,
        answers: String,
        level: Number,
        isActive: Boolean      
*/
 
//Imports
import mongoose from 'mongoose';
 
//Schema
const faqsSchema = new mongoose.Schema({
    questions: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    answers: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    level: {
        type: Number,
        min: 1,
        max: 5,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
    strict: false
});
 
//Export
const FaQs = mongoose.model('FaQs', faqsSchema);