import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/Home";
import Error from "../components/error/Error";
import TodoForm from "../pages/todo-form/TodoForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "/form/:id?",
    element: <TodoForm />,
  },
]);

export default router;
