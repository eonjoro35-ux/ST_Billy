import { Router } from 'express'
import * as newsController from '../controllers/newsController'
import { requireAdmin } from '../middleware/auth'

const router = Router()

router.get('/', newsController.getNews)
router.get('/:id', newsController.getNewsById)
router.post('/', requireAdmin, newsController.createNews)
router.put('/:id', requireAdmin, newsController.updateNews)
router.delete('/:id', requireAdmin, newsController.deleteNews)

export default router
