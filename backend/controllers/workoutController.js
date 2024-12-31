const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {

  const workout = await Workout.findOne({public_key: req.params.id})

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const {nom, public_key, localisation,site,pending} = req.body

  // add to the database
  try {
    const workout = await Workout.create({nom, public_key, localisation,site,pending})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    
    const workout = await Workout.deleteOne({public_key: req.params.id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }

// update a workout
const updateWorkout = async (req, res) => {
  const workout = await Workout.findOneAndUpdate({public_key: req.params.id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}