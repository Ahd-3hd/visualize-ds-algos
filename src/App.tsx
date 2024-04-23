import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { StackComponent } from "./pages/Stack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Stack",
    element: <StackComponent />,
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
