import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { backendUrl, setShowLogin, setToken, setUser } = useContext(AppContext);

  const googleLogin = () => {
    window.open(backendUrl + '/api/user/google', '_self');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = state === 'Login' ? '/api/user/login' : '/api/user/register';
      const payload = state === 'Login' ? { email, password } : { name, email, password };
      const { data } = await axios.post(backendUrl + url, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4'>
      <motion.form
        onSubmit={onSubmitHandler}
        className='relative bg-gradient-to-br from-gray-800 to-black p-10 rounded-3xl w-full max-w-md text-gray-200 shadow-2xl border border-white/10'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className='text-center text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
          {state}
        </h1>
        <p className='text-center text-sm mb-6'>Welcome! Please {state === 'Login' ? 'sign in' : 'create an account'} to continue</p>

        {state !== 'Login' && (
          <div className='mb-4'>
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='Full Name'
              required
              className='w-full px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500'
            />
          </div>
        )}

        <div className='mb-4'>
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Email Address'
            required
            className='w-full px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500'
          />
        </div>

        <div className='mb-6 relative'>
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            required
            className='w-full px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-12'
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-white'
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-cyan-400 hover:to-purple-400 transition duration-200 mb-4 shadow-lg'
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {/* OR separator */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>

        <button
          type='button'
          onClick={googleLogin}
          className='w-full py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition duration-200 shadow'
        >
          <FcGoogle className="text-2xl" /> Continue with Google
        </button>

        <p className='text-center text-sm mt-6'>
          {state === 'Login'
            ? <>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-cyan-400 cursor-pointer'>Sign up</span></>
            : <>Already have an account? <span onClick={() => setState('Login')} className='text-cyan-400 cursor-pointer'>Login</span></>
          }
        </p>

        <button
          type='button'
          onClick={() => setShowLogin(false)}
          className='absolute top-4 right-4 text-gray-400 hover:text-white text-xl'
        >
          ✕
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
