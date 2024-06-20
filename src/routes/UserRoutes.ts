
import express from 'express';
import { createUser } from '../controllers/UserControllers';
import { jwtCheck } from '../middleware/auth';

const router = express.Router()

router.post('/', jwtCheck,createUser)

export default router