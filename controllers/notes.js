const notesRouter = require('express').Router()
const otelApi = require('@opentelemetry/api')
const Note = require('../models/note')
const axios = require('axios')

notesRouter.get('/replies', async (req, res) => {
  const mockRes = await axios.get('http://localhost:3020/replies')
  const replies = mockRes.data
  const activeSpan = otelApi.trace.getActiveSpan(otelApi.context.active())
  const stringReplies = JSON.stringify(replies)
  activeSpan.addEvent('replies requested from external service', {stringReplies})
  res.status(200).send(replies)      
})

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  const activeSpan = otelApi.trace.getActiveSpan(otelApi.context.active())
  const stringNotes = JSON.stringify(notes)
  activeSpan.addEvent('all notes were requested from the notes service', {stringNotes})
  response.status(200).json(notes)      
})
  
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if(note){
    const activeSpan = otelApi.trace.getActiveSpan(otelApi.context.active())
    activeSpan.addEvent('one note requested', {note})
    response.status(200).json(note)
  }else{
    response.status(404).end()
  }  
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  }) 
  const savedNote = await note.save()

  const activeSpan = otelApi.trace.getActiveSpan(otelApi.context.active())
  activeSpan.addEvent('one note created', {savedNote})

  response.status(201).json(savedNote)
})
  
notesRouter.delete('/:id', async (request, response) => {

  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()

})
  
notesRouter.put('/:id', async (request, response) => {

  const body = request.body
  
  const note = {
    content: body.content,
    important: body.important,
  }
  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })

  const activeSpan = otelApi.trace.getActiveSpan(otelApi.context.active())
  activeSpan.addEvent('one note updated', updatedNote)

  response.json(updatedNote)

})
  
module.exports = notesRouter