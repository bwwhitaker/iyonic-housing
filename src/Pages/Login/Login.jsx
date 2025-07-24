import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { supabase } from '../../DBClient/supabaseclient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
	const { login } = useContext(AuthContext);
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setMessage('');

		if (isSignUp) {
			// Sign Up
			const { error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) {
				setError(error.message);
			} else {
				setMessage('Check your email for confirmation link.');
			}
		} else {
			// Login (Sign In)
			const { data, error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) {
				setError(error.message);
			} else {
				login(data.user);
				toast.success('Logged in successfully!');
				navigate('/dashboard'); // Redirect to dashboard
			}
		}
	};

	return (
		<div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
			<h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
				<input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type='submit'>{isSignUp ? 'Sign Up' : 'Login'}</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{message && <p style={{ color: 'green' }}>{message}</p>}
			<p style={{ marginTop: '1rem' }}>
				{isSignUp ? 'Already have an account?' : "Don't have an account?"}
				<button type='button' onClick={() => setIsSignUp(!isSignUp)} style={{ marginLeft: '0.5rem' }}>
					{isSignUp ? 'Login' : 'Sign Up'}
				</button>
			</p>
		</div>
	);
}
