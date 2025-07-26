// ... existing code ...

// Profile page type definitions
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: Date;
  lastLogin: Date;
  projectCount: number;
  isEmailVerified: boolean;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
}

export interface UserStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalViews: number;
  lastActivity: Date;
}

export interface ProfilePageProps {
  onLogout?: () => void;
}