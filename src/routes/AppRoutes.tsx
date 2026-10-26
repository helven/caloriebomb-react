// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Layouts ---
import MainLayout from '@/layouts/MainLayout';

// --- Static Pages ---
import Home from '@/app/page';
import About from '@/app/about/page';
import Pricing from '@/app/pricing/page';
import Contact from '@/app/contact/page';
import PrivacyPolicy from '@/app/privacy/page';

// --- Food Pages ---
// These imports pick the active variant of each food page (see CODING_STANDARDS.md)
import FoodDetail from '@/app/foods/[id]/page_redux_thunk';
import FoodList from '@/app/foods/page_redux_thunk';
import SubmitFood from '@/app/foods/SubmitFood';
// import FoodTest from '@/app/foods/FoodTest';

// --- Sandbox Pages ---
//import SandboxUseCallback from '@/app/sandbox/usecallback/page';
//import SandboxRtkThunkLesson1 from '@/app/sandbox/rtk/thunk-lesson-1';
//import SandboxRtkNoThunkLesson1 from '@/app/sandbox/rtk/no-thunk-lesson-1';
//import SandboxRtkThunkLesson2 from '@/app/sandbox/rtk/thunk-lesson-2';
//import SandboxRtkNoThunkLesson2 from '@/app/sandbox/rtk/no-thunk-lesson-2';
//import SandboxRtkThunkLesson3 from '@/app/sandbox/rtk/thunk-lesson-3';
//import SandboxRtkNoThunkLesson3 from '@/app/sandbox/rtk/no-thunk-lesson-3';
//import SandboxRtkThunkLesson4 from '@/app/sandbox/rtk/thunk-lesson-4';
//import SandboxRtkNoThunkLesson4 from '@/app/sandbox/rtk/no-thunk-lesson-4';

// -----------------------------------------------------------------------------
// ROUTES
// -----------------------------------------------------------------------------
const routes = [
  {
    element: <MainLayout />,
    children: [
      // --- Static Pages ---
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },

      // --- Food Pages ---
      { path: '/foods', element: <FoodList /> },
      { path: '/foods/:id', element: <FoodDetail /> },
      { path: '/foods/submit-food', element: <SubmitFood /> },
      // { path: '/foods/test', element: <FoodTest /> },

      // --- Sandbox Pages ---
      //{ path: '/sandbox/usecallback', element: <SandboxUseCallback /> },
      //{ path: '/sandbox/rtk/thunk-lesson-1', element: <SandboxRtkThunkLesson1 /> },
      //{ path: '/sandbox/rtk/no-thunk-lesson-1', element: <SandboxRtkNoThunkLesson1 /> },
      //{ path: '/sandbox/rtk/thunk-lesson-2', element: <SandboxRtkThunkLesson2 /> },
      //{ path: '/sandbox/rtk/no-thunk-lesson-2', element: <SandboxRtkNoThunkLesson2 /> },
      //{ path: '/sandbox/rtk/thunk-lesson-3', element: <SandboxRtkThunkLesson3 /> },
      //{ path: '/sandbox/rtk/no-thunk-lesson-3', element: <SandboxRtkNoThunkLesson3 /> },
      //{ path: '/sandbox/rtk/thunk-lesson-4', element: <SandboxRtkThunkLesson4 /> },
      //{ path: '/sandbox/rtk/no-thunk-lesson-4', element: <SandboxRtkNoThunkLesson4 /> },
      //  { path: '/todo/update/:id', element: <UpdateTodo /> }
    ],
  },
];

export default routes;
