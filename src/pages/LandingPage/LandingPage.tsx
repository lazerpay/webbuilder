import React, { useState, useEffect } from 'react';
import { Stack } from '@mantine/core';
import { CheckCircle } from 'lucide-react';
import { LandingHeader } from '../../components/LandingHeader/LandingHeader';
import { HeroSection } from '../../components/HeroSection/HeroSection';
import { FeaturesSection } from '../../components/FeaturesSection/FeaturesSection';
import { CTASection } from '../../components/CTASection/CTASection';
import { LandingFooter } from '../../components/LandingFooter/LandingFooter';
import { SignInModal } from '../../components/SignInModal/SignInModal';
import { NotificationToast } from '../../components/NotificationToast/NotificationToast';
import { useToggle } from '../../hooks/useToggle';
import { useNotification } from '../../hooks/useNotification';

interface LandingPageProps {
  onNavigateToBuilder: () => void;
}

export function LandingPage({ onNavigateToBuilder }: LandingPageProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInModalOpened, { setTrue: openSignInModal, setFalse: closeSignInModal }] = useToggle(false);
  const { notification, showNotification, hideNotification } = useNotification();

  // Check if user is signed in on mount
  useEffect(() => {
    const signInInfo = localStorage.getItem('webbuilder_signin');
    setIsSignedIn(!!signInInfo);
  }, []);

  const handleSignIn = (email: string, password: string) => {
    // Save sign in data to localStorage
    const signInData = {
      signedIn: true,
      timestamp: new Date().toISOString(),
      user: {
        name: email.split('@')[0], // Use email prefix as name
        email: email
      },
      credentials: {
        email,
        password // In real app, never store password in localStorage
      }
    };
    
    localStorage.setItem('webbuilder_signin', JSON.stringify(signInData));
    setIsSignedIn(true);
  };

  const handleOpenSignInModal = () => {
    openSignInModal();
  };

  const handleCloseSignInModal = () => {
    closeSignInModal();
  };

  const handleShowSuccessNotification = () => {
    showNotification('You have successfully signed in to WebBuilder.', {
      title: 'Welcome back!',
      icon: <CheckCircle size={20} />,
      color: 'green',
      duration: 4000
    });
  };

  const handleGetStarted = () => {
    if (!isSignedIn) {
      openSignInModal();
    } else {
      onNavigateToBuilder();
    }
  };

  const handleWatchDemo = () => {
    // For demo purposes, just navigate to builder
    onNavigateToBuilder();
  };

  return (
    <Stack gap={0} style={{ minHeight: '100vh' }}>
      <LandingHeader 
        isSignedIn={isSignedIn}
        onSignIn={handleSignIn}
        onGoToBuilder={onNavigateToBuilder}
        onOpenSignInModal={handleOpenSignInModal}
      />
      
      <HeroSection 
        onGetStarted={handleGetStarted}
        onWatchDemo={handleWatchDemo}
      />
      
      <FeaturesSection />
      
      <CTASection onGetStarted={handleGetStarted} />
      
      <LandingFooter />
      
      <SignInModal
        opened={signInModalOpened}
        onClose={handleCloseSignInModal}
        onSignIn={handleSignIn}
        onShowSuccessNotification={handleShowSuccessNotification}
      />

      {/* Success Notification */}
      <NotificationToast
        notification={notification}
        onClose={hideNotification}
      />
    </Stack>
  );
}