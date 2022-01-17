const mongoose = require('mongoose')
require('dotenv').config({ path: './config.env' })

const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectToMongo
