import axios from 'axios'; 
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Register() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${BACKEND_URL}/register`, { email, password });
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-3xl font-bold mb-8">Register</h1>
            <div className="w-full max-w-sm">
                <form className="bg-gray-100 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-700"
                            htmlFor="email"
                        >
                            Enter your email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-700"
                            htmlFor="password"
                        >
                            Enter your password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="1234"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 transition-transform transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <Link to="/login" className="text-blue-600 hover:underline text-sm text-center">
                            Already have an account? Login.
                        </Link>
                    </div>
                </form>
                {message && (
                    <div className="mt-4">
                        <p className={`text-${message.includes('successful') ? 'green' : 'red'}-500`}>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;