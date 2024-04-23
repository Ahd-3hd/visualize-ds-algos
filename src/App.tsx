import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { StackPage } from "./pages/Stack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Stack",
    element: <StackPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
