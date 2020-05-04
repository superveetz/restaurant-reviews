import dotEnv from "dotenv";
import express from "express";

import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
// src
import apiRoutes from "./routes/index.mjs";
import { connectMongoDb } from "./config/datasources.mjs";

dotEnv.config();

// connect mongo db
connectMongoDb();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(apiRoutes);

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
