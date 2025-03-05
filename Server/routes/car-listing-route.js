import express from 'express';
import { CreateCarListing } from '../controller/car-listing-controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create-listing', verifyToken, CreateCarListing);

export default router;