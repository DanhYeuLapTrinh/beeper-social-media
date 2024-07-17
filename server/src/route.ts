import { Router } from 'express'

const route = Router()

route.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' })
})

export default route
