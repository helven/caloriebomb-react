# How Axios Works in This Project (Foods Example)

This document explains how Axios interceptors work in our food listing feature, from calling the API to displaying data.

## Complete Flow

```
Component (foods/page.tsx)
         ↓
foodService.getAllFoods()
         ↓
apiService.get('/foods')
         ↓
[REQUEST INTERCEPTOR]
  - Get bearer token
  - Add to headers
         ↓
HTTP Request to API Server
         ↓
API Response
         ↓
[RESPONSE INTERCEPTOR]
  - Handle errors
         ↓
Back to Component
```

## Real Example: Fetching Foods

### 1. Component Calls Service
```typescript
// foods/page.tsx
const response = await foodService.getAllFoods({ 
  page: 1, 
  per_page: 9 
});
```

### 2. Food Service Builds Request
```typescript
// services/api/food/foodService.ts
export const foodService = {
  getAllFoods: ({ page = 1, per_page = 9 }) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('per_page', per_page.toString());
    
    // Calls apiService
    return coreServices.api.get(`/api/v1/foods?${queryParams}`);
  }
};
```

### 3. API Service Executes Request
```typescript
// services/api/core/apiService.ts
async get<T>(url: string, config?: AxiosRequestConfig) {
  const response = await this.api.get<T>(url, config);
  //                         ↑
  //                    Interceptors run here
  return response;
}
```

### 4. Request Interceptor (Automatic)
```typescript
// Runs BEFORE sending request
this.api.interceptors.request.use(
  async (config) => {
    // Get token from localStorage or API
    const token = await authServices.auth.getToken();
    
    if (token) {
      // Add Bearer token to headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config; // Modified config sent to API
  }
);
```

**What happens:**
- Checks `localStorage.getItem('token')`
- If token exists and valid → use it
- If no token or expired → POST to `/api/v1/login` with credentials
- Stores new token in localStorage
- Attaches token to request

### 5. HTTP Request Sent
```
GET https://api.example.com/api/v1/foods?page=1&per_page=9

Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json
```

### 6. API Server Responds
```json
{
  "data": [
    { "id": 1, "name": "Pizza", "calories": 285 },
    { "id": 2, "name": "Burger", "calories": 354 }
  ],
  "total": 100,
  "page": 1
}
```

### 7. Response Interceptor (Automatic)
```typescript
// Runs AFTER receiving response
this.api.interceptors.response.use(
  (response) => response, // Success: pass through
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Unable to access data. Please try again later.'));
    }
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please wait a moment.'));
    }
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('Service temporarily unavailable.'));
    }
    return Promise.reject(error);
  }
);
```

**What happens:**
- If status 200-299 → Pass data through
- If status 401 → "Unable to access data..."
- If status 429 → "Too many requests..."
- If status 500+ → "Service temporarily unavailable..."

### 8. Back to Component
```typescript
// foods/page.tsx
try {
  const response = await foodService.getAllFoods({ page: 1 });
  
  // Success! Display foods
  setFoods(response.data);
  
} catch (error) {
  // Error! Show user-friendly message
  setError(error.message); // "Unable to access data. Please try again later."
}
```

## Key Points

### Interceptors Run Automatically
You never call interceptors manually. They run every time you use:
- `api.get()`
- `api.post()`
- `api.put()`
- `api.delete()`

### Request Interceptor = Before Sending
- Modifies the request config
- Adds authentication token
- Can add custom headers, logging, etc.

### Response Interceptor = After Receiving
- Handles errors globally
- Transforms error messages
- Can retry requests, redirect, etc.

### Clean Component Code
```typescript
// You write this ✅
const response = await foodService.getAllFoods();

// Instead of this ❌
const token = await getToken();
const response = await fetch('/foods', {
  headers: { Authorization: `Bearer ${token}` }
});
if (response.status === 401) {
  throw new Error('Unauthorized');
}
const data = await response.json();
```

## File Structure

```
src/
├── services/
│   └── api/
│       ├── core/
│       │   ├── apiService.ts      ← Axios instance + interceptors
│       │   └── index.ts
│       ├── auth/
│       │   ├── authService.ts     ← Token management
│       │   └── index.ts
│       └── food/
│           ├── foodService.ts     ← Food API calls
│           └── index.ts
└── app/
    └── foods/
        └── page.tsx               ← Component using foodService
```

## Configuration

### Axios Instance Setup
```typescript
// apiService.ts constructor
this.api = axios.create({
  baseURL: API_ROUTES.BASEURL,  // https://api.example.com
  headers: {
    'Content-Type': 'application/json',
  }
});
```

### Environment Variables
```env
VITE_CLIENT_ID=your_client_id
VITE_CLIENT_SECRET=your_client_secret
```

## Why Use Axios Interceptors?

### Without Interceptors
```typescript
// Every component needs this ❌
async function getFoods() {
  const token = await getToken();
  const response = await fetch('/foods', {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (response.status === 401) {
    throw new Error('Unauthorized');
  }
  if (response.status === 500) {
    throw new Error('Server error');
  }
  
  return response.json();
}
```

### With Interceptors
```typescript
// Just call the service ✅
const response = await foodService.getAllFoods();
// Token and errors handled automatically!
```

## Summary

1. **Call service**: `foodService.getAllFoods()`
2. **Request interceptor**: Adds Bearer token automatically
3. **Send request**: GET `/foods` with token
4. **Receive response**: API returns data or error
5. **Response interceptor**: Converts errors to friendly messages
6. **Back to component**: Display data or error

Interceptors make your code cleaner by handling authentication and errors in one central place!
