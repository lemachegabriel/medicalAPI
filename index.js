require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(cors({origin: process.env.APP_URL, credentials: true}))


mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/data", {useUnifiedTopology:true, useNewUrlParser:true, autoIndex:false }).then(() => {
    console.log("sucsess");
}).catch((err) => {
    console.log("error:"+err)
})
require('./src/models/user')
require('./src/models/problem')
require('./src/models/medicines')


app.use(express.json())
app.use('/api', require('./src/routes/routes'))
app.use('/medcines', require('./src/routes/medicines'))
app.use('/problems', require('./src/routes/problems'))

app.get('/', (req, res) => {
    res.send('WORKKK!')
    
  })
  

app.listen(process.env.PORT || 8000);