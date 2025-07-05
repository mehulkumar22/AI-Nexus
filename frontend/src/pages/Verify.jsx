import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {

  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const transactionId = searchParams.get("transactionId");
  const googleToken = searchParams.get("token"); // ✅ for Google auth

  const { backendUrl, loadCreditsData, setToken, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  // ✅ Function to verify stripe payment
  const verifyStripe = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/verify-stripe",
        { success, transactionId },
        { headers: { token: localStorage.getItem('token') } }
      );

      if (data.success) {
        toast.success(data.message);
        loadCreditsData();
      } else {
        toast.error(data.message);
      }

      navigate("/");

    } catch (error) {
      toast.error(error.message);
      console.log(error);
      navigate("/");
    }
  };

  // ✅ Function to handle Google token login
  const verifyGoogleToken = async () => {
    try {
      if (googleToken) {
        localStorage.setItem('token', googleToken);
        setToken(googleToken);

        const { data } = await axios.get(backendUrl + '/api/user/credits', {
          headers: { token: googleToken }
        });

        if (data.success) {
          const updatedUser = {
            name: data.user?.name || '',
            email: data.user?.email || '',
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          toast.success("Logged in with Google");
        } else {
          toast.error(data.message);
        }

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
      navigate("/");
    }
  };

  useEffect(() => {
    if (googleToken) {
      verifyGoogleToken();
    } else if (transactionId && success !== null) {
      verifyStripe();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
