import { connect } from 'mongoose';
 
// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false" 
const mongoURI = "mongodb+srv://Bitt2boss:Bitt2boss@my-note-bookk.sjola.mongodb.net/inotebook?retryWrites=true&w=majority"


const connectToMongo = () => {
    connect(mongoURI, () => {
        console.log("connected to mongoose succesfully")
    })
}
export default connectToMongo;