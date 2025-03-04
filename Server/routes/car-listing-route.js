import express from 'express';
import { CarListing } from '../controller/car-listing-controller.js';

const router = express.Router();

router.post('/create-listing', CarListing);

export default router;