const { json } = require("body-parser")
const User = require("../models/user")

module.exports = {
  async users(req, res) { //Users
    const users = await User.find({}, 'name isAdmin')   //Récupération des champs : name, isAdmin des utilisateurs 
    return res.status(201).send({
      success: true,
      users : users
    })
  },

  async user(req, res) {  //User
    const { id } = req.params
    try{
      const user = await User.findById(id, 'name isAdmin')
      return res.status(201).send({
        success: true,
        user : user
      })
    }
    catch(error){
      console.log(error)
      return res.status('401').json({
        success : false,
        message : "L'id fournit est invalid !"
      })
    }
  }
}