const express = require('express')
const yargs = require('yargs')
const clc = require('cli-color')
const connectToMongo = require('./db')
const Form = require('./model/Model')
require('dotenv').config({ path: './config.env' })

connectToMongo()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

// Create Tasks
const createTasks = async (description, completed) => {
  let post = new Form({
    description,
    completed,
  })
  await post.save().then((res) => {
    console.log(clc.green.bold('Task Added'))
  })
}
yargs.command({
  command: 'create',
  describe: 'Create a task',
  builder: {
    description: {
      describe: 'description',
      demandOption: true,
      type: 'string',
    },
    completed: {
      describe: 'completed',
      demandOption: true,
      type: 'boolean',
    },
  },

  handler(argv) {
    createTasks(argv.description, argv.completed)
  },
})

// Delete Tasks
const deleteTasks = async (id) => {
  let exists = false
  await Form.findById(id).then((result) => {
    if (result) {
      exists = true
    }
  })
  if (exists === true) {
    await Form.findByIdAndDelete(id)
    console.log(clc.blue.bold(' Task has been deleted'))
  } else {
    console.log(clc.red.bold("Task doesn't exist"))
    console.log(clc.cyan.bold(' List of existing Tasks: '))
    displayTasks()
  }
}
yargs.command({
  command: 'delete',
  describe: 'delete a task',
  builder: {
    id: {
      describe: 'id',
      demandOption: true,
      type: 'object',
    },
  },

  handler(argv) {
    deleteTasks(argv.id)
  },
})

// Update Tasks (completed: false -> true)
const updateTasks = async (id) => {
  let exists = false
  await Form.findById(id).then((result) => {
    if (result) {
      exists = true
    }
  })
  if (exists === true) {
    await Form.findByIdAndUpdate(id, { completed: 'true' })
    console.log(clc.blue.bold('Task has been updated'))
  } else {
    console.log(clc.red.bold("Task doesn't exist"))
    console.log(clc.cyan.bold('List of existing Tasks: '))
    displayTasks()
  }
}
yargs.command({
  command: 'update',
  describe: 'update a task from false to true',
  builder: {
    id: {
      describe: 'id',
      demandOption: true,
      type: 'object',
    },
  },

  handler(argv) {
    updateTasks(argv.id)
  },
})

// Read/Display all tasks
const displayTasks = async () => {
  if ((await Form.find().count()) !== 0) {
    console.log(clc.bold.magenta.underline(' My Tasks:'))
    Form.find({}, (error, result) => {
      if (error) {
        return handleError(error)
      }
      console.log(result)
    })
  } else {
    console.log(clc.bold.red('Task list is empty'))
  }
}

yargs.command({
  command: 'read',
  describe: 'display all the tasks',

  handler(argv) {
    displayTasks()
  },
})

// Display completed tasks (completed: true)
const displayCompletedTasks = async () => {
  if ((await Form.find().count()) !== 0) {
    if ((await Form.find({ completed: 'true' }).count()) !== 0) {
      console.log(clc.bold.magenta.underline(' Completed Tasks:'))
      Form.find({ completed: 'true' }, (error, result) => {
        if (error) {
          return handleError(error)
        }
        console.log(result)
      })
    } else {
      console.log(clc.bold.red('All the tasks are incomplete'))
    }
  } else {
    console.log(clc.bold.red('Task list is empty'))
  }
}

yargs.command({
  command: 'readCompleted',
  describe: 'display only completed tasks',

  handler(argv) {
    displayCompletedTasks()
  },
})

// Display incomplete tasks (completed: false)
const displayIncompleteTasks = async () => {
  if ((await Form.find().count()) !== 0) {
    if ((await Form.find({ completed: 'false' }).count()) !== 0) {
      console.log(clc.bold.magenta.underline(' Incomplete Tasks:'))
      Form.find({ completed: 'false' }, (error, result) => {
        if (error) {
          return handleError(error)
        }
        console.log(result)
      })
    } else {
      console.log(clc.bold.red('All the tasks are completed'))
    }
  } else {
    console.log(clc.bold.red('Task list is empty'))
  }
}

yargs.command({
  command: 'readIncomplete',
  describe: 'display only incomplete tasks',

  handler(argv) {
    displayIncompleteTasks()
  },
})

yargs.parse()

app.listen(port)
