"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const blurhash_1 = require("blurhash");
const sharp_1 = __importDefault(require("sharp"));
const cors_1 = __importDefault(require("cors"));
// api.alexximusic.com
const app = (0, express_1.default)();
const IMAGES_DIR_PATH = path_1.default.join(__dirname, "images");
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', ''],
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "images")));
app.get("/", (req, res) => res.send("Hello Server!"));
app.get("/remixes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    const db = yield Promise.resolve().then(() => __importStar(require("./remixesDB.json")));
    res.json(db);
}));
app.get("/releases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    const db = yield Promise.resolve().then(() => __importStar(require("./releasesDB.json")));
    res.json(db);
}));
app.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    const db = yield Promise.resolve().then(() => __importStar(require("./db.json")));
    res.json(db);
}));
const encodeImageToBlurhash = (path) => new Promise((resolve, reject) => {
    (0, sharp_1.default)(path)
        .raw()
        .ensureAlpha()
        .resize(32, 32, { fit: "inside" })
        .toBuffer((err, buffer, { width, height }) => {
        if (err)
            return reject(err);
        resolve((0, blurhash_1.encode)(new Uint8ClampedArray(buffer), width, height, 4, 4));
    });
});
function encodeAllImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const imagesNames = yield promises_1.default.readdir(IMAGES_DIR_PATH);
        const data = [];
        for (const name of imagesNames) {
            const encodedHash = yield encodeImageToBlurhash(path_1.default.join(__dirname, "images", name));
            data.push({ name, blurhash: encodedHash });
            console.log("Hash: ", encodedHash);
        }
        console.log(data);
    });
}
encodeAllImages();
app.listen(9000, () => {
    console.log("Server listening on PORT", 9000);
});
