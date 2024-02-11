import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/Home";
import Error from "../components/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
]);

export default router;
