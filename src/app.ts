import express from 'express';
import cors from 'cors';
import countriesRoute from './routes/countries';
import issRoute from './routes/iss';
import utmRoute from './routes/utm';

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use('/countries', countriesRoute);
app.use('/iss', issRoute);
app.use('/utm', utmRoute);

export default app;
