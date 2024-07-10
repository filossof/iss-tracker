import { Router } from "express";
import * as turf from "@turf/turf";
import countries from "../data/countries.json";
import { getISSData } from "../issCache";

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
    let issData = await getISSData();
    const { latitude, longitude, formattedTime } = issData;
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
