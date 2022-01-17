const mongoose = require('mongoose')
const { Schema } = mongoose

const FormSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'task',
  }
)

const Form = mongoose.model('task', FormSchema)
module.exports = Form
