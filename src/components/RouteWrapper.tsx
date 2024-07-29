import React from 'react';
import { useLocation } from 'react-router-dom';
import TopNavBar from './TopNavBar';

interface RouteWrapperProps {
  username: string | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  children: React.ReactNode;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ username, isAuthenticated, onLogout, children }) => {
  const location = useLocation();
  
  // Check if the current route is not login or register
  const showTopNavBar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showTopNavBar && <TopNavBar username={username} isAuthenticated={isAuthenticated} onLogout={onLogout} />}
      <main className={showTopNavBar ? "pt-16" : ""}> {/* Adjust padding-top if TopNavBar is visible */}
        {children}
      </main>
    </>
  );
};

export default RouteWrapper;
