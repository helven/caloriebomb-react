// @ts-nocheck : JS compatible
import Home from '@/app/page'
//import About from '@/app/About'
import FoodList from '@/app/foods/page'
import FoodDetail from '@/app/foods/[id]/page'
import FoodSubmission from '@/app/foods/FoodSubmission'
import MainLayout from '@/layouts/MainLayout'

const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
    //  { path: '/about', element: <About /> },
      { path: '/foods', element: <FoodList /> },
      { path: '/foods/:id', element: <FoodDetail /> },
      { path: '/foods/food-submission', element: <FoodSubmission /> },
    //  { path: '/todo/update/:id', element: <UpdateTodo /> }
    ]
  }
]

export default routes