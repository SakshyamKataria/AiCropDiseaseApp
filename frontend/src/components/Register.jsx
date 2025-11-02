import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import for redirection

const Register = ({ switchToLogin }) => {
    const [username, setUsername] = useState(''); // ⬅️ New state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, loading, error, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect already authenticated users
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Only navigate *after* the component has mounted and RRD is ready
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await register(username, email, password);
        
        if (success) {
            navigate('/'); // Navigate to the main diagnosis page on success
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Create Account</h2>

            {/* Display API Error from Context */}
            {error && (
                <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Username Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg
                        transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account? 
                {/* Assuming switchToLogin is a function passed from a parent component */}
                <button onClick={switchToLogin} className="text-green-600 hover:text-green-800 font-semibold ml-1">
                    Login
                </button>
            </p>
        </div>
    );
};

export default Register;