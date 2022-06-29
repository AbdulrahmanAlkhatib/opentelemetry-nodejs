const express = require('express')
const cors = require('cors')

let notes = [
    {
      id: 1,
      content: "This is the Backend Side of the App",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Its Build With NodeJS and Uses Express and Cors Modules",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "The Backend Can Recieve Only GET, POST and Delete Requests ",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
]


const app = express()
app.use(express.json())
app.use(cors())

const generateID = () => {
    const maxID = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
    return maxID + 1
}

app.get('/', (request, response) => {
    response.send('<h1>The Server is Running in the Background</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if( !body.content){
        return response.status(400).json({error : "content missing"})
    }

    const note = {
        id: generateID(),
        cotent : body.content,
        date : new Date(),
        important: body.importatnt || false
    }

    notes = notes.concat(note)
    response.json(note)
})

module.exports = app;

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
