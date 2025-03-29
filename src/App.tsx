import { Route, Routes } from "react-router-dom";

import { Layout } from "./layout";

import { routes } from "./utils/routes";
import { Login } from "./pages/login";
import { PrivateRoute } from "./private-route";
import { NotFound } from "./pages/not-found/not-found";

function App() {
  return (
    <>
      <Routes>
        {routes.map((item) => {
          const Component = item.component;
          return (
            <Route
              key={item.id}
              path={item.path}
              element={
                <PrivateRoute>
                  <Layout>
                    <Component />
                  </Layout>
                </PrivateRoute>
              }
            >
              {item.route.map((elm, i) => {
                return (
                  <Route
                    path={elm.path}
                    element={
                      // <PrivateRoute>
                      <elm.component />
                      // </PrivateRoute>
                    }
                    key={i}
                  />
                );
              })}
            </Route>
          );
          // }
        })}
        <Route path={"/login"} element={<Login />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
