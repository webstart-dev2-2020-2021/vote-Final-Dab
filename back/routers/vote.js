const express = require('express')
const controller = require('../controllers/vote.js')
const authUser = require('../middlewares/authUser.js')

exports.router = (() => {
  const vote = express.Router()
  vote.route('/').get(controller.votes)
  vote.route('/create').post(authUser, controller.create)
    vote.route('/:id').post(authUser, controller.vote)
  // vote.route('*').post(controller.vote)
  // vote.route('/:id').delete(controller.removeVote)

  return vote
})()
// correctionvote
// JFNRE8VBrVruQcu
