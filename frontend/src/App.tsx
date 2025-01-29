import { Routes, Route } from "react-router-dom";
import Registration from "./pages/auth/registration";
import Login from "./pages/auth/login";
import HomePage from "./pages/home";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./helpers/protectedRoutes";
import { SessionContextProvider } from "./helpers/sessionContext";

function App() {
  return (
    <div className="App">
      <SessionContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/*"
            element={
              <ProtectedRoutes>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* <Route path="/blog" element={<Blog />} /> */}
                </Routes>
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </SessionContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
