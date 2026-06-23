import { Router } from 'express'
import * as eventsController from '../controllers/eventsController'
import { requireAdmin } from '../middleware/auth'

const router = Router()

router.get('/', eventsController.getEvents)
router.get('/:id', eventsController.getEventById)
router.post('/', requireAdmin, eventsController.createEvent)
router.put('/:id', requireAdmin, eventsController.updateEvent)
router.delete('/:id', requireAdmin, eventsController.deleteEvent)

export default router
