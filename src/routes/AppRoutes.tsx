import Home from '@/pages/Home'
//import About from '@/pages/About'
import FoodList from '@/pages/Foods'
import FoodDetail from '@/pages/Foods/FoodDetail'
//import UpdateTodo from '@/pages/Todo/UpdateTodo'
import MainLayout from '@/layouts/MainLayout'

const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
    //  { path: '/about', element: <About /> },
      { path: '/food/:id', element: <FoodDetail /> },
      { path: '/food/category/:category', element: <FoodList /> },
    //  { path: '/todo/update/:id', element: <UpdateTodo /> }
    ]
  }
]

export default routes