import { Router } from 'express'
import * as usersController from '../controllers/usersController'
import { requireAdmin } from '../middleware/auth'

const router = Router()

router.get('/', requireAdmin, usersController.getUsers)
router.get('/:id', requireAdmin, usersController.getUserById)
router.post('/', requireAdmin, usersController.createUser)
router.put('/:id', requireAdmin, usersController.updateUser)
router.delete('/:id', requireAdmin, usersController.deleteUser)

export default router
