import { useNavigate } from 'react-router-dom';
import { SavedProject } from '../types/schema';

/**
 * Custom hook for centralized navigation logic
 */
export function useNavigation() {
  const navigate = useNavigate();

  const navigateToBuilder = () => {
    // Don't clear current project when navigating to builder
    // Let the builder decide whether to load existing state or show empty state
    navigate('/builder');
  };

  const navigateToProjects = () => {
    navigate('/projects');
  };

  const navigateToEditor = () => {
    navigate('/builder');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const logout = () => {
    // Clear localStorage authentication data
    localStorage.removeItem('webbuilder_signin');
    // Navigate back to landing page
    navigate('/');
  };

  return {
    navigateToBuilder,
    navigateToProjects,
    navigateToEditor,
    navigateToProfile,
    navigateToHome,
    logout,
  };
}