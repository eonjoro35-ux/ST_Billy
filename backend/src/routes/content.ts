import { Router } from 'express'
import * as contentController from '../controllers/contentController'
import { requireAdmin } from '../middleware/auth'

const router = Router()

// Public endpoints
router.get('/settings', contentController.getSettings)
router.get('/homepage', contentController.getHomepage)
router.get('/pages/:slug', contentController.getPageBySlug)
router.get('/about', contentController.getPageBySlug)
router.get('/leadership', contentController.getPageBySlug)
router.get('/academic-programs', contentController.getPageBySlug)

// Admin endpoints
router.put('/settings', requireAdmin, contentController.updateSettings)
router.put('/pages/:slug', requireAdmin, contentController.updatePage)
router.put('/pages/:page/sections/:section', requireAdmin, contentController.updateSection)

export default router
