import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificar token al montar el componente
  useEffect(() => {
    checkLogin();
  }, []);

  // Verificar token cuando la ventana recupera el foco
  useEffect(() => {
    window.addEventListener('focus', checkLogin);
    
    // Verificar inactividad
    let inactivityTimeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        logout();
      }, 30 * 60 * 1000); // 30 minutos de inactividad
    };

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keypress', resetInactivityTimer);

    // Verificar visibilidad de la página
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        clearTimeout(inactivityTimeout);
      } else {
        checkLogin();
        resetInactivityTimer();
      }
    });

    return () => {
      window.removeEventListener('focus', checkLogin);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  const checkLogin = async () => {
    try {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await verifyTokenRequest();
      if (!res.data) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      Cookies.remove("token");
    }
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        setErrors(error.response.data.message);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        setErrors(error.response.data.message);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const clearErrors = () => setErrors([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
