'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: allows cookies to be set
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - redirect to home
        router.push('/');
      } else {
        // Handle error from backend
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFC300] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Star Pattern Background */}
        <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
            <div
            key={i}
            className="absolute text-black opacity-30"
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 10 + 8}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
            }}
            >
            ★
            </div>
        ))}
        </div>
      
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300 relative z-10">
            {/* Fun Header */}
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-[#000814] bg-clip-text text-transparent mb-2">
                Welcome!
            </h1>
            <p className="text-gray-600 text-lg">Let's get started! 🚀</p>
            </div>

            {/* Error Message */}
            {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-2xl">
                <p className="text-red-700 text-center font-semibold">⚠️ {error}</p>
            </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-lg font-bold text-[#000814] mb-2">
                Email
                </label>
                <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 text-[#001D3D] border-4 border-[#001D3D] rounded-lg focus:outline-none focus:border-[#003566] focus:ring-2 focus:ring-[#003566]/30 text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your@email.com"
                />
            </div>

            {/* Password Input */}
            <div>
                <label htmlFor="password" className="block text-lg font-bold text-[#000814] mb-2">
                Password
                </label>
                <div className="relative">
                <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 text-[#001D3D] border-4 border-[#001D3D] rounded-lg focus:outline-none focus:border-[#003566] focus:ring-2 focus:ring-[#003566]/30 text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-[#001D3D] hover:text-[#003566] transition-colors focus:outline-none"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    // Eye Slash Icon (hide password)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // Eye Icon (show password)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer py-4 bg-[#003566] text-white font-bold text-xl rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                </span>
                ) : (
                '✨ Login ✨'
                )}
            </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                New user?{' '}
                <a 
                  href="/auth/signup" 
                  className="text-[#003566] font-bold hover:text-[#001D3D] hover:underline transition-all"
                >
                  Create an account
                </a>
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="mt-8 flex justify-center space-x-4 text-4xl">
            <span className="animate-bounce">🌟</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎈</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
            </div>
        </div>
    </div>
  );
}