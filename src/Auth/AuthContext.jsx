// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export const AuthContext = createContext();

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	// Check for existing Supabase session on mount
	useEffect(() => {
		const checkSession = async () => {
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				console.error('Error fetching session:', error.message);
				setLoading(false);
				return;
			}
			const currentUser = data?.session?.user || null;
			setUser(currentUser);
			setIsAuthenticated(!!currentUser);
			setLoading(false);
		};

		checkSession();

		// Listen for auth state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			const currentUser = session?.user || null;
			setUser(currentUser);
			setIsAuthenticated(!!currentUser);
		});

		return () => subscription.unsubscribe();
	}, []);

	// Log in with email/password
	const login = async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error('Login error:', error.message);
			return { error };
		}
		setUser(data.user);
		setIsAuthenticated(true);
		return { user: data.user };
	};

	// Sign out
	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>
	);
};
