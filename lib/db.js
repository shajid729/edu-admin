import mongoose from "mongoose"

export default async function dbConnect() {
    console.log('Connecting DB');
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    }).then(mongo => console.log('Connected DB'))
}