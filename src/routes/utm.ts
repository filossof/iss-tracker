import { Router } from "express";
import * as utm from "utm";
import { getISSData } from "../issCache";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let issData = await getISSData();
    const { latitude, longitude } = issData;
    const utmPosition = utm.fromLatLon(latitude, longitude);
    res.json(utmPosition);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ISS location" });
  }
});

export default router;
