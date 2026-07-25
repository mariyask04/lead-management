"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    loginUser,
    registerUser,
    getProfile,
} from "@/services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await getProfile();
                setUser(data);
            } catch (error) {
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const register = async (userData) => {
        const data = await registerUser(userData);

        localStorage.setItem("token", data.token);
        setUser(data.user);

        return data;
    };

    const login = async (userData) => {
        const data = await loginUser(userData);

        localStorage.setItem("token", data.token);
        setUser(data.user);

        return data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);