import React, { useState, useEffect } from 'react';
import { Container, Stack, Notification } from '@mantine/core';
import { CheckCircle } from 'lucide-react';
import { Header } from '../../components/Header/Header';
import { UserInfoCard } from '../../components/UserInfoCard/UserInfoCard';
import { AccountSettingsCard } from '../../components/AccountSettingsCard/AccountSettingsCard';
import { ActivityStatsCard } from '../../components/ActivityStatsCard/ActivityStatsCard';
import { mockProfileData } from '../../profileMockData';
import { UserProfile, UserPreferences, ProfilePageProps } from '../../types/schema';

interface ProfilePageExtendedProps extends ProfilePageProps {
  onNavigateToProjects?: () => void;
  onNavigateToHome?: () => void;
}

export function ProfilePage({ onLogout, onNavigateToProjects, onNavigateToHome }: ProfilePageExtendedProps) {
  const [user, setUser] = useState<UserProfile>(mockProfileData.user);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const signInInfo = localStorage.getItem('webbuilder_signin');
    if (signInInfo) {
      try {
        const parsedInfo = JSON.parse(signInInfo);
        if (parsedInfo.user) {
          setUser(prevUser => ({
            ...prevUser,
            name: parsedInfo.user.name || prevUser.name,
            email: parsedInfo.user.email || prevUser.email
          }));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    // Update localStorage
    const signInInfo = localStorage.getItem('webbuilder_signin');
    if (signInInfo) {
      try {
        const parsedInfo = JSON.parse(signInInfo);
        parsedInfo.user = {
          ...parsedInfo.user,
          name: updatedUser.name,
          email: updatedUser.email
        };
        localStorage.setItem('webbuilder_signin', JSON.stringify(parsedInfo));
        
        // Show success notification
        setShowSuccessNotification(true);
        setTimeout(() => setShowSuccessNotification(false), 3000);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  const handleUpdatePreferences = (preferences: UserPreferences) => {
    const updatedUser = { ...user, preferences };
    setUser(updatedUser);
    
    // Show success notification
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Header 
        onProfile={() => {}} // Already on profile page
        onMyProjects={onNavigateToProjects}
        onLogOut={onLogout}
        onLogoClick={onNavigateToHome}
        showProjectActions={false}
        showProjectName={false}
        showSidebarToggle={false}
      />
      
      <Container size="lg" py="xl">
        <Stack gap="lg">
          <UserInfoCard 
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
          
          <AccountSettingsCard 
            preferences={user.preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
          
          <ActivityStatsCard 
            stats={mockProfileData.stats}
          />
        </Stack>
      </Container>

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
            title="Profile Updated!"
            onClose={() => setShowSuccessNotification(false)}
            style={{
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            Your profile has been successfully updated.
          </Notification>
        </div>
      )}
    </div>
  );
}