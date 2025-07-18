import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('https://concesionariobackend-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await res.json();
      const { token, rol } = data;

      setToken(token);
      localStorage.setItem("token", token); // guarda el token

      setIsAuth(true);
      setErrors({});
      console.log('User role:', rol);

      if (rol === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error('Error:', err);
      setErrors({ email: 'Credenciales inválidas o error del servidor.' });
    }
  };

  return (
    <AuthContext.Provider value={{
      email, setEmail, password, setPassword, handleSubmit, errors, isAuth, setIsAuth, token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
