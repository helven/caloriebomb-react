import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const EXTERNAL_API = process.env.API_URL || 'https://helventest.pixelstail.com';
const CLIENT_ID = process.env.API_CLIENT_ID;
const CLIENT_SECRET = process.env.API_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiration = null;

// Get token from external API
const getToken = async () => {
  // Return cached token if still valid
  if (cachedToken && tokenExpiration && new Date() < new Date(tokenExpiration)) {
    return cachedToken;
  }
  try {
    const response = await axios.post(`${EXTERNAL_API}/api/v1/login`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    cachedToken = response.data.token;
    tokenExpiration = response.data.expires_at;
    return cachedToken;
  } catch (error) {
    console.error('Failed to get token:', error.message);
    return null;
  }
};

app.use(cors());
app.use(express.json());

app.use(async (req, res) => {
  try {console.log('here')
    const token = await getToken();

    const response = await axios({
      method: req.method,
      url: `${EXTERNAL_API}${req.url}`,
      data: req.body,
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Server error' });
  }
});

// Local dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3001;
  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
}

// Vercel export
export default app;
