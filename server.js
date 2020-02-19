const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/reserve', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/reservation.html'))
})

app.get('/reservation', (req, res) => {
  fs.readFile('reservation.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }
    const reservation = JSON.parse(data)
    res.json(reservation)
  })
})

app.get('/waitlist', (request, response) =>{
  fs.readFile('waitlist.json', 'utf8', (error, data)=>{
    if(error){console.error(error)}
    const waitlist = JSON.parse(data)
    response.json(waitlist)
  })
})

app.post('/reservation', (req,res) => {
  fs.readFile('reservation.json', 'utf8', (e, data) => {
    if (e) { console.error(e) }
    const reservation = JSON.parse(data)
    reservation.push(req.body)
    fs.writeFile('reservation.json', JSON.stringify(reservation), e => {
      if (e) { console.error(e) }
      res.sendStatus(200)
    })
  })
})

app.post('/waitlist', (req, res) => {
  fs.readFile('waitlist.json', 'utf8', (e, data) => {
    if (e) { console.error(e) }
    const waitlist = JSON.parse(data)
    waitlist.push(req.body)
    fs.writeFile('waitlist.json', JSON.stringify(waitlist), e => {
      if (e) { console.error(e) }
      res.sendStatus(200)
    })
  })
})

app.listen(3000)