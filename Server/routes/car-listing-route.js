import express from 'express';
import { CreateCarListing, EditCarListing, GetAllCarListing, GetListingsByCategory, GetSingleCarListing, GetUserCarListing, SearchCarListings } from '../controller/car-listing-controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/get-all-listing', GetAllCarListing);
router.get('/get-user-listing', verifyToken, GetUserCarListing);
router.get('/get-single-car-listing/:id', verifyToken, GetSingleCarListing);
router.get('/get-listings-by-category/:category', GetListingsByCategory);
router.get('/search', SearchCarListings);
router.post('/create-listing', verifyToken, CreateCarListing);
router.put('/edit-car-list/:id', verifyToken, EditCarListing);

export default router;