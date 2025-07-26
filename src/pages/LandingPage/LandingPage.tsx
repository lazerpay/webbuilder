import React, { useState, useEffect } from 'react';
import { Stack, Notification } from '@mantine/core';
import { CheckCircle } from 'lucide-react';
import { LandingHeader } from '../../components/LandingHeader/LandingHeader';
import { HeroSection } from '../../components/HeroSection/HeroSection';
import { FeaturesSection } from '../../components/FeaturesSection/FeaturesSection';
import { CTASection } from '../../components/CTASection/CTASection';
import { LandingFooter } from '../../components/LandingFooter/LandingFooter';
import { SignInModal } from '../../components/SignInModal/SignInModal';

interface LandingPageProps {
  onNavigateToBuilder: () => void;
}

export function LandingPage({ onNavigateToBuilder }: LandingPageProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInModalOpened, setSignInModalOpened] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

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
    setSignInModalOpened(true);
  };

  const handleCloseSignInModal = () => {
    setSignInModalOpened(false);
  };

  const handleShowSuccessNotification = () => {
    setShowSuccessNotification(true);
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 4000);
  };

  const handleGetStarted = () => {
    if (!isSignedIn) {
      setSignInModalOpened(true);
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
      {showSuccessNotification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
          }}
        >
          <Notification
            icon={<CheckCircle size={20} />}
            color="green"
            title="Welcome back!"
            onClose={() => setShowSuccessNotification(false)}
            style={{
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            You have successfully signed in to WebBuilder.
          </Notification>
        </div>
      )}
    </Stack>
  );
}