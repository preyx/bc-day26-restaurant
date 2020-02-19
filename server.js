const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/waitlist', (request, response) =>{
  fs.readFile('waitlist.json', 'utf8', (error, data)=>{
    if(error){console.error(error)}
    const waitlist = JSON.parse(data)
    console.log(data)
  })
})
app.listen(3000)