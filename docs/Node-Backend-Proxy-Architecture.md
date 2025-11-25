# Node.js Backend Proxy Architecture

## Overview

This project uses a Node.js backend server as a proxy between the React frontend and external API. This architecture provides better security, centralized authentication, and easier API management.

## Architecture Flow

```
React App (Browser)
    ↓
Node.js Server (localhost:3001)
    ↓
External API (helventest.pixelstail.com)
```

## Why Use a Backend Proxy?

1. **Security**: API credentials (client_id, client_secret) stay on the server, never exposed to browser
2. **Authentication**: Server handles token management automatically
3. **CORS**: Eliminates cross-origin issues
4. **Flexibility**: Easy to switch APIs or add middleware without changing frontend code

## Project Structure

```
caloriebomb-react/
├── api/
│   └── index.js              # Node.js backend server
├── src/
│   ├── services/
│   │   └── api/
│   │       ├── core/
│   │       │   └── apiService.ts    # Frontend API client
│   │       └── food/
│   │           └── foodService.ts   # Food API methods
│   └── constants/
│       └── apiRoutes.ts      # API endpoint definitions
├── .env                      # Environment variables
└── package.json
```

## Environment Variables

### `.env` File

```env
# Frontend - React app uses these
VITE_SERVER_URL=http://localhost:3001
VITE_CLIENT_ID=admin@caloriebomb.com
VITE_CLIENT_SECRET=admin123
VITE_APP_DEBUG=true

# Backend - Node server uses these
API_URL=https://helventest.pixelstail.com
API_CLIENT_ID=admin@caloriebomb.com
API_CLIENT_SECRET=admin123
```

### Production (Vercel)

Set in Vercel dashboard:
- `VITE_SERVER_URL` = (leave empty or set to your domain)
- `API_URL` = `https://helventest.pixelstail.com`
- `API_CLIENT_ID` = `admin@caloriebomb.com`
- `API_CLIENT_SECRET` = `admin123`

## How It Works

### 1. Frontend Makes Request

**File**: `src/services/api/food/foodService.ts`

```typescript
getAllFoods: ({ sortby, page, search }) => {
  const queryParams = new URLSearchParams();
  queryParams.append('sortby', sortby);
  queryParams.append('page', page.toString());
  queryParams.append('search', search);
  
  // Calls: http://localhost:3001/api/v1/foods?sortby=name&page=1&search=pizza
  return coreServices.api.get(`${API_ROUTES.FOODS.BASE}?${queryParams}`);
}
```

### 2. Node Server Receives Request

**File**: `api/index.js`

```javascript
app.use(async (req, res) => {
  // 1. Get authentication token
  const token = await getToken();
  
  // 2. Forward request to external API
  const response = await axios({
    method: req.method,
    url: `${EXTERNAL_API}${req.url}`,  // https://helventest.pixelstail.com/api/v1/foods?...
    data: req.body,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  // 3. Return response to frontend
  res.json(response.data);
});
```

### 3. Authentication Flow

The Node server automatically handles authentication:

```javascript
const getToken = async () => {
  // Return cached token if still valid
  if (cachedToken && tokenExpiration && new Date() < new Date(tokenExpiration)) {
    return cachedToken;
  }
  
  // Request new token from external API
  const response = await axios.post(`${EXTERNAL_API}/api/v1/login`, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
  });
  
  // Cache token for reuse
  cachedToken = response.data.token;
  tokenExpiration = response.data.expires_at;
  return cachedToken;
};
```

**Benefits**:
- Token is cached and reused until expiration
- Frontend doesn't need to handle authentication
- Credentials never exposed to browser

## Running the Application

### Development (Local)

**Terminal 1 - Start Node Server:**
```bash
node api/index.js
```
Output: `Backend running on http://localhost:3001`

**Terminal 2 - Start React App:**
```bash
npm run dev
```
Output: `Local: http://localhost:5174`

### Production (Vercel)

Vercel automatically:
1. Builds React app as static files
2. Runs `api/index.js` as serverless function
3. Routes `/api/*` requests to the serverless function via `vercel.json`

## Debugging

### Frontend Logs (React)
- **Location**: Browser Console (F12 → Console tab)
- **Files**: `src/**/*.ts`
- **Example**: 
  ```typescript
  console.log('Calling API:', url);
  ```

### Backend Logs (Node.js)
- **Location**: Terminal where `node api/index.js` runs
- **Files**: `api/index.js`
- **Example**:
  ```javascript
  console.log('Received request:', req.url);
  console.log('Token obtained:', token);
  ```

### Network Inspection
- Open Browser DevTools (F12)
- Go to Network tab
- See all requests to `localhost:3001`
- Inspect request/response headers and data

## Request Flow Example

**User searches for "pizza":**

1. **Frontend** (`foodService.ts`):
   ```
   GET http://localhost:3001/api/v1/foods?search=pizza
   ```

2. **Node Server** (`api/index.js`):
   - Receives: `/api/v1/foods?search=pizza`
   - Gets token: `Bearer eyJ0eXAiOiJKV1QiLCJh...`
   - Forwards to: `https://helventest.pixelstail.com/api/v1/foods?search=pizza`
   - With header: `Authorization: Bearer eyJ0eXAiOiJKV1QiLCJh...`

3. **External API**:
   - Validates token
   - Returns food data

4. **Node Server**:
   - Receives response
   - Forwards to frontend

5. **Frontend**:
   - Receives data
   - Displays results

## Key Files

### `api/index.js`
- Express server that proxies all requests
- Handles authentication with external API
- Caches tokens for performance
- Runs on port 3001 locally

### `src/constants/apiRoutes.ts`
- Defines all API endpoints
- Uses `VITE_SERVER_URL` from environment
- Example: `BASE: 'http://localhost:3001/api/v1/foods'`

### `src/services/api/core/apiService.ts`
- Axios wrapper for making HTTP requests
- Handles response errors globally
- No authentication needed (server handles it)

### `vercel.json`
- Routes `/api/*` to serverless function
- Routes everything else to React app
- Production deployment configuration

## Common Issues

### "Unauthenticated" Error
- **Cause**: Node server not getting valid token
- **Fix**: Check `API_CLIENT_ID` and `API_CLIENT_SECRET` in `.env`
- **Debug**: Look at terminal logs for "Failed to get token"

### CORS Error
- **Cause**: Calling external API directly from browser
- **Fix**: Ensure `VITE_SERVER_URL=http://localhost:3001` in `.env`
- **Verify**: Check Network tab - requests should go to `localhost:3001`

### Node Server Not Running
- **Symptom**: "Connection refused" or "ERR_CONNECTION_REFUSED"
- **Fix**: Start server with `node api/index.js`
- **Verify**: Terminal shows "Backend running on http://localhost:3001"

### Changes Not Reflected
- **Cause**: Node.js doesn't auto-reload
- **Fix**: Restart server (Ctrl+C, then `node api/index.js` again)
- **Better**: Use `nodemon` for auto-restart on file changes

## Advantages Over Direct API Calls

| Aspect | Direct API Call | With Node Proxy |
|--------|----------------|-----------------|
| Security | Credentials in browser | Credentials on server |
| CORS | Browser blocks requests | No CORS issues |
| Authentication | Frontend manages tokens | Server manages tokens |
| API Changes | Update all frontend code | Update only server code |
| Rate Limiting | Per user | Per server |
| Caching | Browser only | Server + Browser |

## Next Steps

- Install `nodemon` for auto-restart: `npm install --save-dev nodemon`
- Add request logging middleware
- Implement response caching
- Add rate limiting
- Set up error monitoring (Sentry, etc.)
