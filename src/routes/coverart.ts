import express from "express";

const router = express.Router();

router.get("/remixes", async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const db = await import("../remixesDB.json");
    res.json(db);
});

router.get("/releases", async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const db = await import("../releasesDB.json");
    res.json(db);
});

router.get("/images", async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const db = await import("../db.json");
    res.json(db);
});

router.get("/releases/2", async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const db = await import("../release.json");
    res.json(db);
});

export default router