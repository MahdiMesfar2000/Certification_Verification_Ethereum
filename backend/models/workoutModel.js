const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  public_key: {
    type: String,
    required: true
  },
  localisation: {
    type: String,
    required: true
  },
  site: {
    type: String,
    required: true
  }
  ,
  pending: {
    type: String,
    required: true
  }


}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)