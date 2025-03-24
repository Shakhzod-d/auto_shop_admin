import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages/dashboard";
import { Layout } from "./layout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
