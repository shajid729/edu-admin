import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    playlistId: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    class: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    total: {
        type: Number,
    },
    subject: {
        type: String,
        default: '',
    },
    subValue: {
        type: String,
        default: '',
    },
    chapter: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
})


const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema)

export default Course