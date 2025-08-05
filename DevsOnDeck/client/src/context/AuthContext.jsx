import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('auth')); // 'dev', 'org', or null

    useEffect(() => {
        const saved = localStorage.getItem('auth');
        setAuth(saved);
    }, []);

    const login = (type) => {
        localStorage.setItem('auth', type);
        setAuth(type);
    };

    const logout = () => {
        localStorage.removeItem('auth');
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
