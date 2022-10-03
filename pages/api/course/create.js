import dbConnect from '../../../lib/db'
import Course from '../../../models/courseSchema'

const CreateCourse = async (req, res) => {
    await dbConnect()

    try {
        const { playlistId, image, total, subject, subValue, chapter, title, category } = req.body

        const course = await Course.create({playlistId, image, total, subject, subValue, chapter, title, category, class: req.body.class })
        
        if(course){
            res.status(200).json({ message: "Successfully Created Course" })
        }else{
            res.status(400).json({ error: "Failed to create Course" })
        }
    } catch (err) {
        res.status(400).json({ errors: err.message })
    }
}

export default CreateCourse