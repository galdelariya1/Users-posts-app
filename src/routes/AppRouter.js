import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RouterSetup from "./RouterSetup";

const router = createBrowserRouter([RouterSetup]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
