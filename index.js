import express from "express";
import connectDB from "./config/database.js";
import router from "./routes/route.js";
import cookieParser  from "cookie-parser"
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

// middelware
app.use(express.json());
app.use(cookieParser())

// databae
connectDB();

// load route
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running is http://localhost:${port}`);
});
