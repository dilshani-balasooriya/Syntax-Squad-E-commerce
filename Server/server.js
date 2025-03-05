import express from 'express';
import "dotenv/config";
import cors from 'cors';
import DBConnection from './config/dbConnection.js';
import authRoute from './routes/auth-route.js';
import carListingRoute from './routes/car-listing-route.js';

const app = express();
const PORT = 3000;

app.use(cors({}));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/car-listing', carListingRoute);

app.listen(PORT, () => {
    DBConnection();
    console.log(`Server is running on port ${PORT}`);
});