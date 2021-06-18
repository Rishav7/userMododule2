import express from 'express'
const router = express.Router()

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  uploadProfilePic
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)

router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

  router.route('/upload/:id')
  .put(uploadProfilePic);

export default router
