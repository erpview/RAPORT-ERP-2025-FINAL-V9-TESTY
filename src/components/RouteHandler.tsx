import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const RouteHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRender = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run on initial render
    if (initialRender.current) {
      initialRender.current = false;

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // If we're on a dictionary page
      if (location.pathname.startsWith('/slownik-erp')) {
        const targetPath = location.pathname;
        
        // First navigate to home
        navigate('/', { replace: true });

        // Then back to the dictionary page after a brief delay
        timeoutRef.current = setTimeout(() => {
          navigate(targetPath, { 
            replace: true,
            state: { forceReload: true }
          });
        }, 100);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname, navigate]);

  // Add a listener for popstate events (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname.startsWith('/slownik-erp')) {
        window.location.reload();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.pathname]);

  return <>{children}</>;
};
