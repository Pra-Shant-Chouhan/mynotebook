
const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
require("dotenv").config();
 
connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })

}


app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

