import express from "express";
import { importImagesUrls } from "../utils/images";
import path from "path";
import fs from "fs/promises";
import { encode } from "blurhash";
import sharp from "sharp";
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import login from './routes/login';
import register from './routes/register';
import coverart from './routes/coverart';
import Users from './routes/users';
import './auth/index';
import log from './utils';
import routes from "./routes/users";
import deserializeUser from './middleware/deserializeUser';
import cookieParser from "cookie-parser";
import connect from "./utils/connect";
dotenv.config();

// api.alexxiofficial.com

const PORT = 9000 || 9001

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.0.125:3000', 'http://192.168.0.126:3000'],
    credentials: true, 
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(deserializeUser);

//app.use(bodyParser.urlencoded({ extended: true }));

//const IMAGES_DIR_PATH = path.join(__dirname, "images");

app.use(express.static(path.join(__dirname, "images")));
// app.use(express.static(path.join(__dirname, "videos")));

// app.get("/", (req, res) => res.send("Hello Server!"));

app.use("/api/v1/images", coverart);
// app.use("/api/v1", login);
// app.use("/api/v1", register);
// app.use("/api/v1", Users);  

app.listen(PORT, async () => {

  log.info(`Server listening on PORT, ${PORT}`);

  await connect();

  routes(app);
});