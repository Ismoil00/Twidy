import { Routes, Route } from "react-router-dom";
import Registration from "./pages/auth/registration";
import Login from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./helpers/protectedRoutes";
import { SessionContextProvider } from "./helpers/sessionContext";
import Layout from "./pages/layout";
import Homepage from "./pages/home";
import Messages from "./pages/messages";
import Settings from "./pages/settings";

function App() {
  return (
    <div className="App bg-brand_gray">
      <SessionContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/*"
            element={
              <ProtectedRoutes>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="home" element={<Homepage />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                  <Route path="*" element={<div>Page not found</div>} />
                </Routes>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </SessionContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
