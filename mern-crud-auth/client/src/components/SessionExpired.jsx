import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export function SessionExpired({ show }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        logout();
        navigate('/login');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, logout, navigate]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Sesión Expirada</h2>
        <p className="mb-4">Tu sesión ha expirado. Serás redirigido al inicio de sesión.</p>
        <div className="animate-pulse h-1 bg-indigo-500 rounded"></div>
      </div>
    </div>
  );
} 