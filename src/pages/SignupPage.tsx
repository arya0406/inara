import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import type { AppDispatch, RootState } from '../app/store';
import { signup } from '../features/auth/authSlice';
import { authService } from '../services/authService';
import Button from '../components/common/Button';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error: authError } = useSelector((state: RootState) => state.auth);
  
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  const [verificationCode, setVerificationCode] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleVerificationMethodChange = (method: 'email' | 'phone') => {
    setVerificationMethod(method);
    setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSendVerification = async () => {
    if (!validateForm()) return;
    
    try {
      const response = await authService.sendVerificationCode(
        verificationMethod === 'email' ? formData.email : formData.phoneNumber,
        verificationMethod
      );
      
      if (response.success) {
        setVerificationSent(true);
        if (response.verificationId) {
          setVerificationId(response.verificationId);
        }
      } else {
        throw new Error('Failed to send verification code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationSent) {
      await handleSendVerification();
      return;
    }

    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    try {
      // Verify the code first
      const verifyResponse = await authService.verifyCode(verificationId, verificationCode);
      
      if (!verifyResponse.success) {
        throw new Error('Invalid verification code');
      }

      // Create account if verification succeeds
      await dispatch(signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        verificationCode
      })).unwrap();

      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.');
    }
  };

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
          Create Account
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto px-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Join The Inara Studio family and explore our exclusive collections
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
              {!verificationSent ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-primary-gold mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold text-base text-gray-700"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-primary-gold mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold text-base text-gray-700"
                        required
                      />
                    </div>
                  </div>

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
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-primary-gold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
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
                      minLength={8}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-gold mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold text-base text-gray-700"
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-primary-gold">
                      Verification Method
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={verificationMethod === 'email'}
                          onChange={() => handleVerificationMethodChange('email')}
                          className="text-primary-gold focus:ring-primary-gold"
                        />
                        <span className="ml-2 text-sm text-primary-gold">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={verificationMethod === 'phone'}
                          onChange={() => handleVerificationMethodChange('phone')}
                          className="text-primary-gold focus:ring-primary-gold"
                        />
                        <span className="ml-2 text-sm text-primary-gold">Phone</span>
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-primary-gold mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold text-base text-gray-700"
                    required
                    maxLength={6}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter the 6-digit code sent to your {verificationMethod === 'email' ? 'email' : 'phone'}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 text-base bg-primary-gold hover:bg-primary-gold/90"
                loading={isLoading}
              >
                {verificationSent ? 'Create Account' : 'Send Verification Code'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-gold hover:text-primary-gold/80 font-medium">
                  Sign in
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

export default SignupPage;
