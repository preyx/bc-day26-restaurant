const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.json(__dirname, 'public')))

app.get('/reservation', (req, res) => {
  fs.readFile('reservation.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }
    const reservation = JSON.parse(data)
    res.json(reservation)
  })
})

app.listen(3000)