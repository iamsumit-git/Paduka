import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // In a real app, you might want to validate the token with the backend here
            // For now, we'll assume if there is a token, the user is logged in
            // You can decode the token to get user info if needed
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) setUser(storedUser);
        }
        setLoading(false);
    }, [token]);

    const login = (userData, authToken) => {
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
