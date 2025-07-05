import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [credit, setCredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // ✅ Load user credits & details
const loadCreditsData = async (activeToken = token) => {
  if (!activeToken) return;
  try {
    const { data } = await axios.get(
      backendUrl + '/api/user/credits',
      { headers: { token: activeToken } }
    );

    if (data.success) {
      setCredit(data.credits || 0);
      const updatedUser = {
        name: data.user?.name || '',
        email: data.user?.email || '',
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Failed to load user data");
  }
};


  // ✅ Google token login handler
  const googleLogin = async (googleToken) => {
    try {
      localStorage.setItem('token', googleToken);
      setToken(googleToken);
      await loadCreditsData(googleToken);
      toast.success("Logged in with Google");
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };

  // ✅ Generate Image API
  const generateImage = async (prompt, style) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/image/generate-image',
        { prompt, style },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
        return null;
      }
    } catch (error) {
      toast.error(error.message || 'Failed to generate image');
      return null;
    }
  };

  // ✅ Detect Nudity API
  const detectNudity = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/detect',
        formData,
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.result;
      } else {
        toast.error(data.message || 'Detection failed');
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Detection error');
      return null;
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    setCredit(0);
  };

  // ✅ Load credits data on token change
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    token, setToken,
    user, setUser,
    showLogin, setShowLogin,
    credit, setCredit,
    loadCreditsData,
    backendUrl,
    generateImage,
    detectNudity,
    logout,
    googleLogin // ✅ export for use in Verify.jsx or anywhere else
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
