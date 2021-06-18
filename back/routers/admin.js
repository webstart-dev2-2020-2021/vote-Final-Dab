const express = require('express')
const controller = require('../controllers/admin.js')

exports.router = (() => {
  const admin = express.Router()
  admin.route('/users/').get(controller.users)    //Users
  admin.route('/users/:id').get(controller.user)  //User

  return admin
})()