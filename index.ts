import express from "express";
import { importImagesUrls } from "./utils/images";
import path from "path";
import fs from "fs/promises";
import { encode } from "blurhash";
import sharp from "sharp";
import cors from "cors";


// api.alexximusic.com


const app = express();

const IMAGES_DIR_PATH = path.join(__dirname, "images");

app.use(cors({
  origin: ['http://localhost:3000'],
}));
app.use(express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => res.send("Hello Server!"));

app.get("/remixes", async (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");

  const db = await import("./remixesDB.json");
  res.json(db);
});

app.get("/releases", async (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");

  const db = await import("./releasesDB.json");
  res.json(db);
});

app.get("/images", async (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");

  const db = await import("./db.json");
  res.json(db);
});

const encodeImageToBlurhash = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

async function encodeAllImages() {
  const imagesNames = await fs.readdir(IMAGES_DIR_PATH);

  const data: { name: string; blurhash: string }[] = [];

  for (const name of imagesNames) {
    const encodedHash = await encodeImageToBlurhash(
      path.join(__dirname, "images", name)
    );
    data.push({ name, blurhash: encodedHash });
    console.log("Hash: ", encodedHash);
  }

  console.log(data);
}

encodeAllImages();

app.listen(9000, () => {
  console.log("Server listening on PORT", 9000);
});