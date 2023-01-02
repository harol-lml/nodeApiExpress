require('dotenv').config()
require('./mongo')

const Note = require('./models/Note')
const { response, request } = require('express')
const express = require('express')
const app = express()
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')


app.use(express.json())


app.get('/', (request, response) => {
    response.send('<h1>Welcome to notes app! </h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then( notes => response.json(notes))
})

app.get('/api/notes/:id', (request, response, next) => {
    const {id} = request.params

    Note.findById(id).then(note => {
        if (note)
            response.json(note)
        response.status(404).end()
    }).catch(e => {
        next(e)
    })
})

app.put('/api/notes/:id',  (request, response, next) => {
    const {id} = request.params
    const note = request.body

    if (!note || !note.content)
        return response.status(400).json({
            error: 'note data is massing'
        })

    const nNoteInfo = {
        content: note.content,
        important: note.important
    }

    Note.findByIdAndUpdate(id, nNoteInfo, {new: true})
        .then(result => {
            response.json(result)
        })
        .catch(e => next(e))
})

app.delete('/api/notes/:id', (request, response, next) => {
    const {id} = request.params

    Note.findByIdAndRemove(id).then(result => {
        console.log(result);
        response.status(204).end()
    }).catch(e => next(e))
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.content)
        return response.status(400).json({
            error: 'note data is massing'
        })


    const nNote = new Note({
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    })

    nNote.save().then(save => {
        response.status(201).json(save)
    })

})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})