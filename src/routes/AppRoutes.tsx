import Home from '../pages/Home'
//import About from '../pages/About'
//import AddTodo from '../pages/Todo/AddTodo'
//import UpdateTodo from '../pages/Todo/UpdateTodo'
import MainLayout from '../layouts/MainLayout'

const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> }
    //  { path: '/about', element: <About /> },
    //  { path: '/todo/add', element: <AddTodo /> },
    //  { path: '/todo/update/:id', element: <UpdateTodo /> }
    ]
  }
]

export default routes