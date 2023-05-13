const express = require('express');
const {sequelize} = require('./models')
const {handleErrors} = require('./helpers/error')

const app = express()

app.use(express.json())

sequelize.sync({alter:true})

const v1 = require("./routers/v1")
app.use('/practice/v1',v1)

app.use(handleErrors)
app.listen(4000)