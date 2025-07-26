import React from 'react';
import { Group, Button, Text } from '@mantine/core';
import { LogIn, ArrowRight } from 'lucide-react';
import { Logo } from '../Header/Logo';

interface LandingHeaderProps {
  isSignedIn: boolean;
  onSignIn: () => void;
  onGoToBuilder: () => void;
  onOpenSignInModal: () => void;
}

export function LandingHeader({ isSignedIn, onSignIn, onGoToBuilder, onOpenSignInModal }: LandingHeaderProps) {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.3)',
        padding: '16px 24px',
      }}
    >
      <Group justify="space-between" align="center">
        {/* Left Section - Logo */}
        <Logo size={40} />

        {/* Right Section - Auth Button */}
        {isSignedIn ? (
          <Button
            leftSection={<ArrowRight size={16} />}
            variant="filled"
            size="md"
            onClick={onGoToBuilder}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Go to Builder
          </Button>
        ) : (
          <Button
            leftSection={<LogIn size={16} />}
            variant="filled"
            size="md"
            onClick={onOpenSignInModal}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Sign In
          </Button>
        )}
      </Group>
    </div>
  );
}