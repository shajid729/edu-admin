import dbConnect from '../../../lib/db'
import Course from '../../../models/courseSchema'

const GetCourse = async (req, res) => {
    await dbConnect()

    try {
        const { subject, chapter } = req.query
        if (req.query.class && subject && chapter) {
            const courses = await Course.find({ class: req.query.class.toUpperCase(), subValue: subject, chapter })
            res.status(200).json({ message: courses })
        } else {
            const courses = await Course.find()

            if (courses) {
                res.status(200).json({ message: courses })
            } else {
                res.status(400).json({ error: "Failed to find Course" })
            }
        }
    } catch (err) {
        res.status(400).json({ errors: err.message })
    }
}

export default GetCourse