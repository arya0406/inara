import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import type { AppDispatch, RootState } from '../app/store';
import { login } from '../features/auth/authSlice';
import Button from '../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error: authError } = useSelector((state: RootState) => state.auth);
  
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Attempt to login
      const result = await dispatch(login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      })).unwrap();

      // Navigate to home on successful login
      if (result.user) {
        navigate('/home');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    }
  };

  // Show auth slice errors if present
  const displayError = error || authError;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Title Section */}
      <motion.section
        className="mt-4 pt-8 pb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-playfair mb-3 text-primary-gold"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto px-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sign in to your account to continue your journey with us
        </motion.p>
      </motion.section>

      {/* Form Section */}
      <section className="flex-grow py-8 px-4">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-10 rounded-lg shadow-md border border-gray-100"
          >
            {displayError && (
              <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-gold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold text-base text-gray-700"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-gold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold text-base text-gray-700"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="text-primary-gold focus:ring-primary-gold rounded"
                  />
                  <span className="ml-2 text-sm text-primary-gold">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-gold hover:text-primary-gold/80">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 text-base bg-primary-gold hover:bg-primary-gold/90"
                loading={isLoading}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-gold hover:text-primary-gold/80 font-medium">
                  Create Account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Bottom Spacing for Footer */}
      <div className="py-8"></div>
    </div>
  );
};


