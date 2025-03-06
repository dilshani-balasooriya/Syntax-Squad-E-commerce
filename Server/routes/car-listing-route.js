import express from 'express';
import { CreateCarListing, GetAllCarListing, GetUserCarListing } from '../controller/car-listing-controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create-listing', verifyToken, CreateCarListing);
router.get('/get-all-listing', GetAllCarListing);
router.get('/get-user-listing', verifyToken, GetUserCarListing);

export default router;