// import { createContext, useContext, useState, useEffect } from 'react';
// import API from '../services/api';


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Sirf user info localStorage mein — token nahi (wo cookie mein hai)
//   const [user, setUser] = useState(() => {
//     try {
//       const saved = localStorage.getItem('lbs_user');
//       return saved ? JSON.parse(saved) : null;
//     } catch {
//       return null;
//     }
//   });
//   const [loading, setLoading] = useState(false);

//   // App load pe verify karo ki cookie valid hai ya nahi
//   useEffect(() => {
//     const verifySession = async () => {
//       if (!user) return;
//       try {
//         await API.get('/auth/me');
//       } catch {
//         // Cookie expire ho gayi — logout karo
//         localStorage.removeItem('lbs_user');
//         setUser(null);
//       }
//     };
//     verifySession();
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const { data } = await API.post('/auth/login', { email, password });
//       // Token cookie mein save ho gaya (backend ne set kiya)
//       // Sirf user info localStorage mein rakhte hain
//       localStorage.setItem('lbs_user', JSON.stringify(data.user));
//       setUser(data.user);
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || 'Login failed' };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       // Backend se cookie clear karwao
//       await API.post('/auth/logout');
//     } catch {
//       // API fail ho tab bhi local state clear karo
//     } finally {
//       localStorage.removeItem('lbs_user');
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'admin' }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

















import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Axios instance bana lo (same as API service)
const api = axios.create({
  baseURL: ' https://school-backend-o571.onrender.com/api', // apna backend URL daalna
  withCredentials: true, // cookie ke liye IMPORTANT
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lbs_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Session verify
  useEffect(() => {
    const verifySession = async () => {
      if (!user) return;
      try {
        await api.get('/auth/me');
      } catch {
        localStorage.removeItem('lbs_user');
        setUser(null);
      }
    };
    verifySession();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });

      localStorage.setItem('lbs_user', JSON.stringify(data.user));
      setUser(data.user);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore error
    } finally {
      localStorage.removeItem('lbs_user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
