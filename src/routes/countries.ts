import { Router } from "express";
import countries from "../data/countries.json";

const router = Router();

router.get("/", (req, res) => {
  const countryNames = countries.features.map(
    (country: any) => country.properties.name
  );
  res.json(countryNames);
});

export default router;
