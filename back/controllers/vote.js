const { json } = require('body-parser')
const Vote = require('../models/vote')
const jwt = require('jsonwebtoken')

module.exports = {
  async create(req, res) {
    //Crée un vote
    const { name } = req.body

    if (!req.userIsAdmin) {
      {
        return res.status('401').json({
          success: false,
          message: 'Vous n’êtes pas autorisé à effectuer cette requête !',
        })
      }
    }
    if (!name) {
      return res.status('400').json({
        success: false,
        message: 'Le champ : name est obligatoire !',
      })
    }

    try {
      const newVote = new Vote({ name })
      const savedVote = await newVote.save()

      return res.status(201).send({
        sucess: true,
        message: 'Nouveau vote crée avec succès !',
      })
    } catch (error) {
      console.log('vote controller ~> error ~>', error)
      return res.status(500).json({
        success: false,
        message:
          'Il semblerait que nous rencontrions un problème, veuillez réessayer plus tard !',
      })
    }
  },

    async vote(req, res) {  //Voter
        const { id } = req.params
        try{
            const token =  req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, JWT_SECRET)
            const vote = await Vote.findById(id)

            if (vote.users.includes(decoded._id)) {
                return res.status(201).send({
                    success: false,
                    message : 'Vous avez déjà participer à ce vote !'
                })
            }

            const pushVote = await Vote.updateOne(
                { _id: id },
                { $push: { users: decoded._id } }
            )

            return res.status(201).send({
                success: true,
                message : "Merci d'avoir participé à ce vote !"
            })
        }
        catch(error){
            console.log(error)
            return res.status('500').json({
                success : false,
                message : "Il semblerait que nous rencontrons un problème !"
            })
        }
    },

  async votes(req, res) {
    try {
      //Votes
      const dbVotes = await Vote.find({}, 'name users') //Récupération des champs : name et users des votes
      var votes = []
      dbVotes.forEach((dbVote) => {
        let length = dbVote.users.length
        let { name } = dbVote
        let id = dbVote._id
        let vote = {
          length,
          name,
            id
        }
        votes = [...votes, vote]
      })
      return res.status(201).send({
        success: true,
        votes,
      })
    } catch (error) {
      console.log('vote controller ~> votes(req, res) ~> error ~>', error)
      return res.status('500').json({
        success: false,
        message: 'Il semblerait que nous rencontrons un problème !',
      })
    }
  },

  async removeVote(req, res) {
    //Retirer mon vote
    const { id } = req.params
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const vote = await Vote.findById(id)

      if (!vote.users.includes(decoded._id)) {
        return res.status(403).send({
          success: false,
          message:
            "Impossible de retirer votre vote car vous n'y avez pas participé !",
        })
      }

      const removeVote = await Vote.updateOne(
        { _id: id },
        { $pull: { users: decoded._id } }
      )

      return res.status(201).send({
        success: true,
        message: 'Votre vote a été retiré !',
      })
    } catch (error) {
      console.log(error)
      return res.status('500').json({
        success: false,
        message: 'Il semblerait que nous rencontrons un problème !',
      })
    }
  },
}
