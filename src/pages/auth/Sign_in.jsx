import React, { useState, useEffect, Fragment } from 'react';
import "aos/dist/aos.css";
import Aos from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { signinFailure, signinStart, signinSuccess } from '../../store/userReducers';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { loading, error } = useSelector((state) => state.user);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      dispatch(signinFailure('Please fill in all fields'));
      setMessage('Please fill in all fields');
      setIsSuccess(false);
      openModal();
      return;
    }
    
    dispatch(signinStart());
    
    try {
      console.log({ email, password });
      const response = await fetch(`https://vtu-xpwk.onrender.com/api/v1/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensures cookies are sent with request
      });

      console.log(response);
      
      // Ensure response is not empty
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok || data.status === 'error' || !data.token) {
        throw new Error(data.message || 'Invalid response');
      }

      dispatch(signinSuccess(data));
      setMessage('Logged in successfully!');
      setIsSuccess(true);
      openModal();

      setTimeout(() => navigate("/"), 1000);
      
    } catch (error) {
      console.error("Error in sign-in:", error.message, error);

      if (error.message.includes('CORS')) {
        setMessage('CORS error: Backend may not allow this request.');
      } else {
        setMessage(error.message || 'An error occurred. Please try again.');
      }

      dispatch(signinFailure(message));
      setIsSuccess(false);
      openModal();
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100 items-center justify-center lg:p-6 p-3">
        <div className="w-full max-w-md rounded-lg bg-white shadow-lg lg:p-8 p-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#ADF802] text-center mb-6">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-600">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-300" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-600">Password</label>
              <input 
                type="password" 
                id="password" 
                className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-300" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <div className="flex items-end justify-end">
              <Link to="/forgot-password-request" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline">Sign Up</Link>
            </p>

            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-[#ADF802] text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400" 
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      {/* Dialog for Success/Error Messages */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black/30" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
              <Dialog.Title className={`text-2xl font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isSuccess ? 'Success!' : 'Error!'}
              </Dialog.Title>
              <p className="mt-4 text-gray-700">{message}</p>
              <button className="mt-6 px-4 bg-gray-200 hover:text-gray-100 duration-200 text-gray-800 py-2 rounded hover:bg-blue-600" onClick={closeModal}>
                Got it, thanks!
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      <Footer />
    </>
  );
};

export default SignIn;
