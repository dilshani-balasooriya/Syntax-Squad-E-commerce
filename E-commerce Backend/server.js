import express from 'express';
import "dotenv/config";
import cors from 'cors';
import DBConnection from './config/dbConnection.js';

const app = express();
const PORT = 3000;

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());


app.listen(PORT, () => {
    DBConnection();
    console.log(`Server is running on port ${PORT}`);
});