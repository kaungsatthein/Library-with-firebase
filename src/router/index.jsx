import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from '../pages/Home'
import Create from '../pages/Create'
import Search from '../pages/Search'
import BookDetail from "../pages/BookDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/create",
        element: <Create />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/books/:id",
        element: <BookDetail />
      }
    ]
  },
]);

export default router;
