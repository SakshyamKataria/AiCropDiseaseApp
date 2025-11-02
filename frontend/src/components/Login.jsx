import React, { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
// Assuming you use react-router-dom for navigation
import { useNavigate } from 'react-router-dom'; 

const Login = ({ switchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Optionally redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear any previous general error displayed by the component
        // Note: Context.error holds the API error
        
        const success = await login(email, password);
        
        if (success) {
            navigate('/'); // Navigate to the main diagnosis page
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">User Login</h2>

            {/* Display API Error from Context */}
            {error && (
                <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg
                        transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account? 
                {/* Assuming switchToRegister is a function passed from a parent component */}
                <button onClick={switchToRegister} className="text-blue-600 hover:text-blue-800 font-semibold ml-1">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default Login;