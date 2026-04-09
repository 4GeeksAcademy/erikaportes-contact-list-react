import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Not found!</h1>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contacts",
        element: <Contacts />
      },
      {
        path: "/add",
        element: <AddContact />
      },
      {
        path: "/edit/:id", 
        element: <AddContact />
      }
    ]
  }
]);

export default router;