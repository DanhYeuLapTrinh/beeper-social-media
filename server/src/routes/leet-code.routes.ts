import leetCodeService from '@/services/leet-code.services'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const leetCodeRoutes = Router()

leetCodeRoutes.get('/all', async (req, res) => {
  const reponse = await leetCodeService.getProblems({ categorySlug: '', limit: 10, filters: {}, skip: 0 })
  res.json(reponse)
})

leetCodeRoutes.get('/:slug', async (req, res) => {
  const slug = req.params.slug
  const reponse = await leetCodeService.getProblem(slug)
  res.json(reponse)
})

export default leetCodeRoutes
