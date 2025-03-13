import express from 'express';
import { GetProfile, Login, Register } from '../controller/auth-controller.js';

const router = express.Router();

router.get('/get-profile/:id', GetProfile);
router.post('/register', Register);
router.post('/login', Login);

export default router;