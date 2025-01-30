import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const RouteHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If we're accessing a direct URL, force a navigation to trigger the router
    if (location.pathname.startsWith('/slownik-erp')) {
      const currentPath = location.pathname;
      navigate('/', { replace: true });
      setTimeout(() => {
        navigate(currentPath, { replace: true });
      }, 0);
    }
  }, []);

  return <>{children}</>;
};
