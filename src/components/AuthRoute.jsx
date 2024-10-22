import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthRoute({ children }) {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const navigate = useNavigate();

  const checkAuthToken = () => {
    const accessToken = sessionStorage.getItem('access');
    const refreshToken = sessionStorage.getItem('refresh');
    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  return(
  <>{children}</>
)  

};
  


export default AuthRoute
