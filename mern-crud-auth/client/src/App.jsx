import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import Footer from './components/ui/Footer.jsx';
import { SessionExpired } from "./components/SessionExpired";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    // Verificar token expirado
    const checkTokenExpiration = () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 < Date.now()) {
            setShowSessionExpired(true);
          }
        } catch (error) {
          console.error('Error checking token:', error);
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Verificar cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <TaskProvider>
        <div className="min-h-screen flex flex-col">
          <BrowserRouter>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
            <Footer />
            <SessionExpired show={showSessionExpired} />
          </BrowserRouter>
        </div>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
