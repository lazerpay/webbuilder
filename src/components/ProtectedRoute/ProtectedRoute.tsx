import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const signInInfo = localStorage.getItem('webbuilder_signin');
    
    if (!signInInfo) {
      // Redirect to landing page if not signed in
      navigate('/', { replace: true });
      return;
    }

    try {
      const parsedInfo = JSON.parse(signInInfo);
      if (!parsedInfo.signedIn) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      // Invalid data in localStorage, redirect to landing
      localStorage.removeItem('webbuilder_signin');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Check if user is signed in before rendering
  const signInInfo = localStorage.getItem('webbuilder_signin');
  if (!signInInfo) {
    return null; // Don't render anything while redirecting
  }

  try {
    const parsedInfo = JSON.parse(signInInfo);
    if (!parsedInfo.signedIn) {
      return null; // Don't render anything while redirecting
    }
  } catch (error) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
}