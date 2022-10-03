import User from '../../../models/userSchema'
import dbConnect from '../../../lib/db'

const GetUser = async (req, res) => {
    await dbConnect()
    if(req.method=='GET'){
        try {
            const users = await User.find().select('_id name email role verified')

            res.status(200).json({ message: users})
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    }else if(req.method == 'PATCH'){
        try {
            await User.findByIdAndUpdate(req.query.id, {role: 'editor'})

            res.status(200).json({ message: 'Successflly Updated'})
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    }else if(req.method == 'DELETE'){
        try {
            await User.findByIdAndDelete(req.query.id)

            res.status(200).json({ message: 'Delted User'})
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    }else{
        res.status(500).json({message: "Invalid Request"})
    }
}

export default GetUser