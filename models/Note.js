const {Schema, model} = require('mongoose')

const noteSchema = new Schema ({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = model('Note', noteSchema)

module.exports = Note

/* Note.find({}).then(response => {
    console.log(response);
    connection.close()
}).catch(e => {
    console.error(e);
}) */

/* const note = new Note({
    content: "Nota de prueba con Mongo",
    date: new Date(),
    important: true
})

note.save()
    .then(result => {
        console.log(result);
        connection.close()
    })
    .catch(e => {console.error(e);}) */