import dbConnect from '../../../lib/db'
import Course from '../../../models/courseSchema'

const CreateCourse = async (req, res) => {
    await dbConnect()

    if (req.method == 'POST') {
        try {
            const { playlistId, image, name, total, subject, subValue, chapter, title, category } = req.body
            let course
            if (req.body.role == 'admin' || req.body.role == 'editor') {
                course = await Course.create({ playlistId, image, name, total, subject, subValue, chapter, title, category, class: req.body.class })
            } else {
                course = true
            }

            if (course) {
                res.status(200).json({ message: "Successfully Created Course" })
            } else {
                res.status(400).json({ error: "Failed to create Course" })
            }
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    } else if (req.method == 'PATCH') {
        try {
            const { id, playlistId, image, name, total, subject, subValue, chapter, title, category } = req.body

            let course
            if(req.body.role=='admin'  || req.body.role=='editor'){
                course = await Course.findByIdAndUpdate({ _id: id }, { playlistId, name, image, total, subject, subValue, chapter, title, category, class: req.body.class })
            }else{
                course = true
            }

            if (course) {
                res.status(200).json({ message: "Successfully Updated Course" })
            } else {
                res.status(400).json({ error: "Failed to update Course" })
            }
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    } else if (req.method == 'DELETE') {
        try {
            const { id } = req.query
            
            if(req.query.role == 'admin' || req.query.role=='editor'){
                const course = await Course.findByIdAndDelete(id)
            }else{
                const course = true;
            }
            
            res.status(200).json({ message: "Deleted Course" })
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    } else {
        res.status(500).json({ error: "Invalid Request" })
    }
}

export default CreateCourse