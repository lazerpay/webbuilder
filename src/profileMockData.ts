// Mock data for profile page
export const mockProfileData = {
  user: {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@webbuilder.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    memberSince: new Date('2023-01-15'),
    lastLogin: new Date('2024-01-15T10:30:00'),
    projectCount: 12,
    isEmailVerified: true,
    preferences: {
      notifications: true,
      newsletter: false
    }
  },
  stats: {
    totalProjects: 12,
    publishedProjects: 8,
    draftProjects: 4,
    totalViews: 1250,
    lastActivity: new Date('2024-01-15T09:45:00')
  }
};