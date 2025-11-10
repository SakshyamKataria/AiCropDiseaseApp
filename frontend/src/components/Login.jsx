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
        <div className="glass-effect p-10 rounded-2xl shadow-plant-lg w-full max-w-md border border-plant-200">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-plant-gradient shadow-lg mb-4">
                    <span className="text-3xl">🌿</span>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent">
                    Welcome Back
                </h2>
                <p className="text-plant-600 mt-2 text-sm font-medium">Sign in to continue</p>
            </div>

            {/* Display API Error from Context */}
            {error && (
                <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <span className="text-xl mr-2">⚠️</span>
                        <p className="font-medium">{error}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email Input */}
                <div>
                    <label className="block text-plant-700 font-semibold mb-2 text-sm" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-plant-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-plant-500 focus:border-plant-500 transition-all duration-200 bg-white"
                        placeholder="your.email@example.com"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-plant-700 font-semibold mb-2 text-sm" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-plant-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-plant-500 focus:border-plant-500 transition-all duration-200 bg-white"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full plant-gradient hover:from-plant-600 hover:to-plant-700 text-white font-bold py-3 px-6 rounded-xl
                        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-plant-lg transform hover:scale-[1.02] text-lg"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging In...
                        </span>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-plant-600">
                Don't have an account? 
                <button onClick={switchToRegister} className="text-plant-600 hover:text-plant-700 font-bold ml-1 underline decoration-2 underline-offset-2 transition-colors">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default Login;