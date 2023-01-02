const mongoose = require('mongoose')
const pas = process.env.MONGO_PASSWORD
const dbase = process.env.MONGO_NAME

const conection = `mongodb+srv://${dbase}:${pas}@cluster0.e9tjso8.mongodb.net/notesdb?retryWrites=true&w=majority`

//connect 
mongoose.connect(conection)
    .then(() => {
        console.log('DataBase connected');
    }).catch(err => {
        console.error(err);
    })