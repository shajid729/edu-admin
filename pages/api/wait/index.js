import User from '../../../models/userSchema'
import dbConnect from '../../../lib/db'
import { getSession } from 'next-auth/react'

const Wait = async (req, res) => {
    await dbConnect()
    if(req.method=='GET'){
        try {
            if (req.query.id) {
                const user = await User.findOne({ _id: req.query.id })
                res.status(200).json({ message: user.role })
            }else{
                res.status(400).json({ error: 'Did not get id' })
            }
        } catch (err) {
            res.status(400).json({ errors: err.message })
        }
    }
}

export default Wait