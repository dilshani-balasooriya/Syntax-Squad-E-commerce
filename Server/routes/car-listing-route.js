import express from 'express';
import { CreateCarListing } from '../controller/car-listing-controller.js';

const router = express.Router();

router.post('/create-listing', CreateCarListing);

export default router;