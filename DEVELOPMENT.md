# 🛠️ CalorieBomb Development Guide

This guide describes how to set up, run, and build the CalorieBomb React application for local development.

> [!IMPORTANT]
> **API Proxy Required for Local Development**
> This project does **NOT** query the external API directly from the browser (to prevent CORS errors and protect client secrets). 
> You **MUST** run the Node.js proxy server (`api/index.js`) on port **3001** alongside the React dev server for API requests to work.

---

## 🏃‍♂️ How to Run Locally

### Option 1: Start Both Services Together (Recommended)
Now that `concurrently` is installed, you can start both the backend proxy and frontend dev server with a single command:

```bash
npm run dev:all
```
This automatically runs:
* **Node Proxy Server** on `http://localhost:3001`
* **Vite Dev Server** on `http://localhost:5174`

---

### Option 2: Run Separately (Manual)
If you prefer to see outputs in separate terminal windows:

1. **Terminal 1 - Start the API Proxy**:
   ```bash
   node api/index.js
   ```
2. **Terminal 2 - Start the React Frontend**:
   ```bash
   npm run dev
   ```

---

## 📋 Environment Configuration Checklist

Make sure your `.env` file in the root directory contains the following active keys:

```env
# 1. Point the React App to the Node Proxy Server
VITE_SERVER_URL=http://localhost:3001
VITE_API_SECRET=57d83d5c-293b-422c-b09f-5c9ad475d86e

# 2. Configure the Node Proxy Server Credentials
API_URL=https://helventest.pixelstail.com
API_CLIENT_ID=admin@caloriebomb.com
API_CLIENT_SECRET=admin123
API_SECRET=57d83d5c-293b-422c-b09f-5c9ad475d86e
```

---

## 🏗️ Production Build

To generate the optimized production assets:

```bash
npm run build
```

This compiles TypeScript definitions and runs Vite to output static files into the `dist/` directory.

---

## 🔍 Troubleshooting API Issues

* **`404 /api/v1/foods`**: Check if `VITE_SERVER_URL` in `.env` is uncommented and set to `http://localhost:3001`.
* **`403 Forbidden`**: Check that `VITE_API_SECRET` and `API_SECRET` match exactly in your `.env` file.
* **`Failed to get token`**: Check that your `API_CLIENT_ID` and `API_CLIENT_SECRET` in `.env` match the credentials registered on the Laravel external API.
