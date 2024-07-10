import axios from "axios";

interface ISSData {
  latitude: number;
  longitude: number;
  timestamp: number;
  formattedTime: string;
}

const ttl: number = 10000; //10 sec

let issDataCache: ISSData | null = null;
let updatedAt: number = 0;

const fetchISSData = async (): Promise<ISSData> => {
  const response = await axios.get("http://api.open-notify.org/iss-now.json");
  const { latitude, longitude } = response.data.iss_position;
  const timestamp = response.data.timestamp;
  const formattedTime = new Date(timestamp * 1000).toLocaleString();
  issDataCache = { latitude, longitude, timestamp, formattedTime };
  return issDataCache;
};

const getISSData = async (): Promise<ISSData> => {
  const hasData = Boolean(issDataCache);
  const isFreshData = Date.now() - updatedAt < ttl;

  if (isFreshData && hasData) {
    return issDataCache!;
  }

  const deferedData: ISSData = await fetchISSData();
  updatedAt = Date.now();
  issDataCache = deferedData;

  return deferedData;
};

export { getISSData };
