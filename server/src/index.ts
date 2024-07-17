import express from 'express'
import route from './route'

const app = express()
const port = 5000

app.use(express.json())

app.use(route)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
