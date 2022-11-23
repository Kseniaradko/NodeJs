const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')


async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(`${note.id} ${note.title}`))
    })
}

async function removeNote(id) {
    const notes = await getNotes()
    console.log(chalk.red('Note was deleted!'))
    const newNotes = notes.filter(note => Number(note.id) !== id)
    await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

async function editNote(id, title) {
    const notes = await getNotes()
    const newNotes = notes.map(note => {
        if (Number(note.id) !== id) {
            return {...note, title}
        }
        return note
    })
    await fs.writeFile(notesPath, JSON.stringify(newNotes))
    console.log(chalk.bgBlue(`Title of note with id ${id} was changed on ${title}`))
}

module.exports = {
    addNote, printNotes, removeNote, editNote
}