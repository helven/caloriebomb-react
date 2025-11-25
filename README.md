# 💣 CalorieBomb

> A modern food nutrition search application that helps users discover the nutritional content and calorie information of their favorite foods.

**Live Demo:** [https://caloriebomb.senjitsu.com](https://caloriebomb.senjitsu.com)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#️-tech-stack)
- [Key Features](#-key-features)
- [Architecture](#️-architecture)
- [Technical Highlights](#-technical-highlights)
- [Setup & Installation](#-setup--installation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Contact](#-contact)

---

## 🎯 Overview

CalorieBomb is a portfolio project built to demonstrate modern React development practices, TypeScript implementation, and full-stack architecture. The application allows users to search for foods, browse by categories, and view detailed nutritional information including calories, macronutrients, and more.

**Problem Solved:** Users often struggle to find accurate nutritional information quickly. CalorieBomb provides a fast, intuitive interface with real-time search and organized category browsing.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks and features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js + Express** - Proxy server for secure API communication
- **Vercel Serverless Functions** - Production deployment

### API Backend (Separate Repository)
- **Laravel 12** - RESTful API with admin dashboard
- **Laravel Inertia** - Server-side rendering for dashboard
- **Shadcn UI** - Modern component library for admin interface
- **PHP 8.3** - Server-side language
- **MySQL** - Database for food nutrition data
- **Bearer Token Authentication** - Secure API access

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS + Autoprefixer** - CSS processing for Tailwind
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## ✨ Key Features

### 🔍 Smart Search System
- **Single Source of Truth Search Bar** - Centralized search logic using custom `useSearch` hook
- Real-time search with URL state synchronization
- Debounced input for optimized API calls
- Search persistence across page navigation
- URL-based state management for shareable search results

### 🎨 User Experience
- **Dark/Light Theme Toggle** - Persistent theme preference using `useTheme` hook and localStorage
- Responsive design for mobile, tablet, and desktop
- Featured foods with random selection
- Category-based browsing (Meat, Vegetable, Fruit, Dessert)

### 🏗️ Architecture
- **Secure API Proxy Pattern** - Node.js backend protects API credentials
- **Token Caching & Auto-Refresh** - Cached tokens with expiration checking
- CORS-free architecture
- Clean separation of concerns

### ⚡ Performance
- **Memoized Components** - Implemented React.memo for optimized re-renders in earlier version
- Efficient state management with Zustand
- Custom hooks for reusable logic
- URL-based state management for shareable links

---

## 🏛️ Architecture

### Request Flow

```
User Browser (React App)
    ↓
Node.js Proxy Server (localhost:3001 / Vercel Serverless)
    ↓
External API (helventest.pixelstail.com)
```

### Why Proxy Architecture?

1. **Security** - API credentials never exposed to browser
2. **Authentication** - Automatic token management and caching
3. **CORS** - Eliminates cross-origin issues
4. **Flexibility** - Easy to switch APIs without frontend changes

### Key Architecture Files

```
api/index.js                    # Express proxy server
src/services/api/               # API service layer
src/hooks/                      # Custom React hooks
src/context/                    # React context providers
src/stores/useAppStore.ts       # Zustand global state
```

---

## 🎓 Technical Highlights

### 1. Single Source of Truth Search Bar

Implemented centralized search logic to prevent state inconsistencies:

```typescript
// useSearch.tsx - Custom hook for search logic
export const useSearch = ({ redirectTo } = {}) => {
  const navigation = useNavigationService();

  const performSearch = (query) => {
    query = query.trim();
    
    // Redirect from homepage to foods page
    if (navigation.getCurrentPath() !== redirectTo) {
      navigation.navigate(redirectTo, { search: query });
      return;
    }
    
    // Update URL query string as single source of truth
    query === '' 
      ? navigation.removeQueryString('search')
      : navigation.setQueryString('search', query);
  };

  return { performSearch };
};
```

**Benefits:**
- URL is the single source of truth
- Shareable search results via URL
- Browser back/forward navigation works seamlessly
- No state synchronization issues

### 2. Token Caching & Automatic Refresh

Backend automatically manages authentication tokens with caching:

```javascript
// api/index.js
let cachedToken = null;
let tokenExpiration = null;

const getToken = async () => {
  // Return cached token if still valid
  if (cachedToken && tokenExpiration && new Date() < new Date(tokenExpiration)) {
    return cachedToken;
  }
  
  // Fetch new token and cache it
  const response = await axios.post(`${EXTERNAL_API}/api/v1/login`, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
  });
  
  cachedToken = response.data.token;
  tokenExpiration = response.data.expires_at;
  return cachedToken;
};
```

**Benefits:**
- Reduces API calls by reusing valid tokens
- Automatic token refresh when expired
- Frontend doesn't handle authentication
- Credentials never exposed to browser

### 3. Memoized Components (Earlier Implementation)

Implemented React.memo optimization for food listing components:

```typescript
// Prevents unnecessary re-renders when parent updates
const FoodCard = React.memo(({ food }) => {
  // Component logic
});
```

**Benefits:**
- Prevents re-rendering all food cards when only one changes
- Improves performance when parent component updates
- Reduces unnecessary DOM operations

**Note:** This was implemented in the initial version that fetched all foods at once. Current version uses pagination which handles performance differently.

### 4. Custom Hooks Architecture

Reusable logic extracted into custom hooks:
- `useSearch` - Search functionality with URL sync
- `useTheme` - Dark/light mode toggle with localStorage
- `useUrlState` - URL state management
- `useOnClickOutside` - Click outside detection
- `useProcessListingData` - Data transformation (Earlier Implementation)

### 5. Theme Persistence with Zustand

Global state management with localStorage persistence:

```typescript
// useAppStore.ts
const useAppStore = create<AppState>((set) => ({
  themeMode: 'light',
  initApp: async () => {
    const storedTheme = localStorage.getItem('themeMode') || 'light';
    set({ themeMode: storedTheme });
  },
  setThemeMode: () => set((state) => {
    const newTheme = state.themeMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newTheme);
    return { themeMode: newTheme };
  }),
}));
```

### 6. Clean Code Organization

```
src/
├── app/              # Page components
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── context/          # React context providers
├── services/         # API and navigation services
├── stores/           # Zustand state management
├── utils/            # Utility functions
└── constants/        # API routes and constants
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Environment Variables

Create `.env` file in the root directory:

```env
# Frontend
VITE_SERVER_URL=http://localhost:3001
VITE_APP_DEBUG=true

# Backend
API_URL=https://helventest.pixelstail.com
API_CLIENT_ID=your_client_id
API_CLIENT_SECRET=your_client_secret
API_SECRET=your_secret_key
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/caloriebomb-react.git
cd caloriebomb-react

# Install dependencies
npm install

# Start backend proxy server (Terminal 1)
node api/index.js

# Start frontend dev server (Terminal 2)
npm run dev
```

Visit `http://localhost:5174` in your browser.

---

## 📁 Project Structure

```
caloriebomb-react/
├── api/
│   └── index.js                    # Express proxy server
├── src/
│   ├── app/                        # Page components
│   │   ├── home/                   # Homepage
│   │   ├── foods/                  # Food listing page
│   │   └── auth/                   # Authentication pages
│   ├── components/                 # Reusable components
│   │   ├── common/                 # Common UI components
│   │   ├── listing/                # Listing components
│   │   ├── FoodCard.tsx           # Food card component
│   │   ├── SearchBar.tsx          # Search bar component
│   │   └── ThemeModeButton.tsx    # Theme toggle
│   ├── hooks/                      # Custom React hooks
│   │   ├── useSearch.tsx          # Search logic
│   │   ├── useTheme.tsx           # Theme management
│   │   └── useUrlState.tsx        # URL state sync
│   ├── services/
│   │   ├── api/                    # API service layer
│   │   └── navigation.ts           # Navigation service
│   ├── context/                    # React contexts
│   │   ├── Search/                 # Search context
│   │   └── Theme/                  # Theme context
│   ├── stores/
│   │   └── useAppStore.ts         # Zustand store
│   ├── constants/
│   │   └── apiRoutes.ts           # API endpoints
│   └── styles/                     # Global styles
├── docs/                           # Documentation
├── .env                            # Environment variables
├── vercel.json                     # Vercel deployment config
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── package.json
```

---

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   vercel
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   - `API_URL`
   - `API_CLIENT_ID`
   - `API_CLIENT_SECRET`
   - `API_SECRET`

3. **Deploy**
   ```bash
   vercel --prod
   ```

The `vercel.json` configuration automatically:
- Routes `/api/*` to serverless function
- Serves React app as static files
- Handles SPA routing

---

## 🔮 Future Improvements

### 1. Hybrid Pagination System (Priority)
**Problem:** Current implementation makes 1 API call per page change, causing unnecessary network requests and slower navigation.

**Solution:** Batch pagination - fetch 5 pages in a single API call, cache locally, and serve from cache when user navigates between those pages.

**Benefits:**
- Reduce API HTTP requests by 80%
- Faster page navigation (instant for cached pages)
- Lower server load and bandwidth usage
- Better user experience with seamless pagination

**Implementation Plan:**
```typescript
// Backend API already supports hybrid mode
GET /api/v1/foods?page=1&per_page=15&hybrid=true

// Frontend implementation
const usePaginationCache = () => {
  const [cache, setCache] = useState({});
  const PAGES_PER_FETCH = 5;
  
  const fetchBatch = async (page) => {
    const batchStart = Math.floor((page - 1) / PAGES_PER_FETCH) * PAGES_PER_FETCH + 1;
    const response = await api.get(`/foods?page=${batchStart}&hybrid=true`);
    
    // Cache all 5 pages locally
    const batchData = splitIntoPagesLocally(response.data);
    setCache(prev => ({ ...prev, ...batchData }));
  };
  
  const getPage = (page) => {
    const batchKey = Math.floor((page - 1) / PAGES_PER_FETCH);
    if (!cache[batchKey]) {
      fetchBatch(page);
    }
    return cache[batchKey]?.[page];
  };
  
  return { getPage };
};
```

**Technical Details:**
- Backend to implement in `FoodController.php` with `hybrid=true` parameter
- Returns 5 pages worth of data in single response
- Frontend splits and caches data by page number
- Only fetches new batch when user navigates outside cached range

### 2. Additional Features
- User accounts and favorite foods
- Meal planning and calorie tracking
- Nutritional comparison tool (compare 2+ foods side-by-side)
- Export meal plans to PDF
- Progressive Web App (PWA) support
- Offline mode with service workers
- Food recommendations based on dietary preferences

### 3. Performance Optimizations
- Implement React Query for advanced caching and background refetching
- Add image lazy loading with Intersection Observer API
- Optimize bundle size with code splitting and dynamic imports
- Add skeleton loading states for better perceived performance

### 4. Testing & Quality
- Unit tests
- E2E tests with Playwright

---

## 👤 Contact

**Senjitsu**

- LinkedIn: [https://www.linkedin.com/in/senjitsu/](https://www.linkedin.com/in/senjitsu/)
- Portfolio: [https://caloriebomb.senjitsu.com](https://caloriebomb.senjitsu.com)

---

## 📄 License

This project is a portfolio piece and is available for viewing and reference.

---

## 🙏 Acknowledgments

- Built with React 19 and TypeScript
- Styled with Tailwind CSS
- Deployed on Vercel
- API integration with custom proxy architecture

---

**⭐ If you found this project interesting, please consider giving it a star!**
