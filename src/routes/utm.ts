import { Router } from "express";
import axios from "axios";
import * as utm from "utm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://api.open-notify.org/iss-now.json");
    const { latitude, longitude } = response.data.iss_position;
    const utmPosition = utm.fromLatLon(latitude, longitude);
    res.json(utmPosition);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ISS location" });
  }
});

export default router;
