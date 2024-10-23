import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import routes from "./routes/routes";

const App = () => {
  const routings = createBrowserRouter(routes);

  return (
    <div>
      <RouterProvider router={routings}></RouterProvider>
    </div>
  );
};

export default App;
