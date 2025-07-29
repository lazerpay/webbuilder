import React, { useState, useEffect } from 'react';
import { Container, Stack } from '@mantine/core';
import { CheckCircle } from 'lucide-react';
import { Header } from '../../components/Header/Header';
import { UserInfoCard } from '../../components/UserInfoCard/UserInfoCard';
import { AccountSettingsCard } from '../../components/AccountSettingsCard/AccountSettingsCard';
import { ActivityStatsCard } from '../../components/ActivityStatsCard/ActivityStatsCard';
import { NotificationToast } from '../../components/NotificationToast/NotificationToast';
import { mockProfileData } from '../../profileMockData';
import { UserProfile, UserPreferences, ProfilePageProps } from '../../types/schema';
import { useNotification } from '../../hooks/useNotification';

interface ProfilePageExtendedProps extends ProfilePageProps {
  onNavigateToProjects?: () => void;
  onNavigateToHome?: () => void;
}

export function ProfilePage({ onLogout, onNavigateToProjects, onNavigateToHome }: ProfilePageExtendedProps) {
  const [user, setUser] = useState<UserProfile>(mockProfileData.user);
  const { notification, showNotification, hideNotification } = useNotification();

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
        showNotification('Your profile has been successfully updated.', {
          title: 'Profile Updated!',
          icon: <CheckCircle size={20} />,
          color: 'green'
        });
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  const handleUpdatePreferences = (preferences: UserPreferences) => {
    const updatedUser = { ...user, preferences };
    setUser(updatedUser);
    
    // Show success notification
    showNotification('Your preferences have been successfully updated.', {
      title: 'Preferences Updated!',
      icon: <CheckCircle size={20} />,
      color: 'green'
    });
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
      <NotificationToast
        notification={notification}
        onClose={hideNotification}
      />
    </div>
  );
}