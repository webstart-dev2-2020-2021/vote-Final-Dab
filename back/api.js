const dotenv = require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const crypto = require('crypto')

const authRouter = require('./routers/auth.js').router
const adminRouter = require('./routers/admin.js').router
const voteRouter = require('./routers/vote.js').router
const authAdmin = require('./middlewares/authAdmin.js')
const app = express()

const { DB_USER, DB_NAME, DB_PASSWORD } = process.env
global.JWT_SECRET = 'victor'
console.log(JWT_SECRET)

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb+srv://thomaseyaa:gXFzt28Ir3tbJGMN@cluster0.mlko6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR: CANNOT CONNECT TO MONGO-DB'))
db.once('open', () => console.log('CONNECTED TO MONGO-DB'))

app.use(helmet())
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use('/auth/', authRouter) //Route auth
app.use('/admin/', authAdmin, adminRouter) //Route admin
app.use('/vote/', voteRouter) //Route vote

app.listen(3000, () => {
  console.log('Serveur lancé sur le port 3000, bon développement !')
})
