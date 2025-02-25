import express from 'express';
import "dotenv/config";
import DBConnection from './config/dbConnection.js';

const app = express();
const PORT = 3000;

app.use(express.json());


app.listen(PORT, () => {
    DBConnection();
    console.log(`Server is running on port ${PORT}`);
});