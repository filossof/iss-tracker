import { Router } from "express";
import axios from "axios";
import * as turf from "@turf/turf";
import countries from "../data/countries.json";

const router = Router();

const isPointInPolygon = (point: [number, number], polygon: any) => {
  const pt = turf.point(point);
  if (polygon.type === "Polygon") {
    const poly = turf.polygon(polygon.coordinates);
    return turf.booleanPointInPolygon(pt, poly);
  } else if (polygon.type === "MultiPolygon") {
    const poly = turf.multiPolygon(polygon.coordinates);
    return turf.booleanPointInPolygon(pt, poly);
  }
  return false;
};

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://api.open-notify.org/iss-now.json");
    const { latitude, longitude } = response.data.iss_position;
    const timestamp = response.data.timestamp;
    const formattedTime = new Date(timestamp * 1000).toLocaleString();
    let currentLocation = "Ocean";

    for (const country of countries.features) {
      if (isPointInPolygon([longitude, latitude], country.geometry)) {
        currentLocation = country.properties.name;
        break;
      }
    }

    res.json({ location: currentLocation, time: formattedTime });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ISS location" });
  }
});

export default router;
