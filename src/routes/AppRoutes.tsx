// @ts-nocheck : JS compatible
import Home from '@/app/page';
import About from '@/app/about/page';
import Pricing from '@/app/pricing/page';
import Contact from '@/app/contact/page';
import PrivacyPolicy from '@/app/privacy/page';
import FoodDetail from '@/app/foods/[id]/page_redux';
import FoodList from '@/app/foods/page';
import SubmitFood from '@/app/foods/SubmitFood';
// import FoodTest from '@/app/foods/FoodTest';
import MainLayout from '@/layouts/MainLayout';

const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/foods', element: <FoodList /> },
      { path: '/foods/:id', element: <FoodDetail /> },
      { path: '/foods/submit-food', element: <SubmitFood /> },
      // { path: '/foods/test', element: <FoodTest /> },
      //  { path: '/todo/update/:id', element: <UpdateTodo /> }
    ],
  },
];

export default routes;
