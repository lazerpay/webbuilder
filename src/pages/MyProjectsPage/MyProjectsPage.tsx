import React, { useState, useMemo, useCallback } from 'react';
import { Container, Stack, Title, Group, Button, SimpleGrid, Text } from '@mantine/core';
import { Trash2, Check } from 'lucide-react';
import { SavedProject } from '../../types/schema';
import { formatProjectCount } from '../../utils/stringFormatters';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { ProjectsEmptyState } from '../../components/ProjectsEmptyState/ProjectsEmptyState';
import { Header } from '../../components/Header/Header';
import { NotificationToast } from '../../components/NotificationToast/NotificationToast';
import { useProjects } from '../../hooks/useProjects';
import { useNotification } from '../../hooks/useNotification';
import { useNavigation } from '../../hooks/useNavigation';
import { useToggle } from '../../hooks/useToggle';
import { projectService } from '../../services/projectService';

interface MyProjectsPageProps {
  // Props removed - using hooks only
}

export function MyProjectsPage({}: MyProjectsPageProps) {
  const { projects, deleteProject, deleteAllProjects } = useProjects();
  const { notification, showNotification, hideNotification } = useNotification();
  const { navigateToEditor, navigateToProfile, navigateToHome, logout } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, { setTrue: openDeleteModal, setFalse: closeDeleteModal }] = useToggle(false);
  const [deleteAllModalOpen, { setTrue: openDeleteAllModal, setFalse: closeDeleteAllModal }] = useToggle(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  const handleDeleteProject = useCallback((projectName: string) => {
    setProjectToDelete(projectName);
    openDeleteModal();
  }, [openDeleteModal]);

  const confirmDeleteProject = useCallback(() => {
    if (!projectToDelete) return;

    deleteProject(projectToDelete);
    showNotification('Project deleted successfully', { 
      icon: <Check size={18} />,
      color: 'green' 
    });
    
    setProjectToDelete(null);
    closeDeleteModal();
  }, [projectToDelete, deleteProject, showNotification, closeDeleteModal]);

  const handleDeleteAllProjects = useCallback(() => {
    openDeleteAllModal();
  }, [openDeleteAllModal]);

  const confirmDeleteAllProjects = useCallback(() => {
    deleteAllProjects();
    showNotification('All projects deleted successfully', { 
      icon: <Check size={18} />,
      color: 'green' 
    });
    closeDeleteAllModal();
  }, [deleteAllProjects, showNotification, closeDeleteAllModal]);

  const handleCreateProject = useCallback(() => {
    // Clear any existing project and navigate to editor for new project
    projectService.clearCurrentProject();
    navigateToEditor();
  }, [navigateToEditor]);

  const handleProfile = useCallback(() => {
    navigateToProfile();
  }, [navigateToProfile]);

  const handleHome = useCallback(() => {
    navigateToHome();
  }, [navigateToHome]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <Stack gap={0} h="100vh" style={{ overflow: 'hidden' }}>
      {/* Header Component */}
      <Header 
        onProfile={handleProfile}
        onMyProjects={() => {}} // Already on projects page
        onLogOut={handleLogout}
        onLogoClick={handleHome}
        showSidebarToggle={false}
        showProjectActions={false}
        showProjectName={false}
      />
      
      <Container size="xl" py="xl" style={{ flex: 1, overflow: 'auto' }}>
        <Stack gap="xl">

          {/* Page Title and Delete All Button */}
          <Group justify="space-between" align="center">
            <div>
              <Title order={1} size="h2">
                My Projects
              </Title>
              <Text size="sm" c="dimmed" mt="xs">
                {formatProjectCount(filteredProjects.length)} found
              </Text>
            </div>

            {projects.length > 0 && (
              <Button
                leftSection={<Trash2 size={16} />}
                variant="outline"
                color="red"
                onClick={handleDeleteAllProjects}
              >
                Delete All Projects
              </Button>
            )}
          </Group>

          {/* Search Bar */}
          {projects.length > 0 && (
            <Group gap="md">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search projects..."
              />
            </Group>
          )}

          {/* Projects Grid or Empty State */}
          {filteredProjects.length === 0 ? (
            <ProjectsEmptyState
              hasSearchQuery={!!searchQuery.trim()}
              onCreateProject={handleCreateProject}
            />
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  onDelete={handleDeleteProject}
                />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>

      {/* Delete Project Modal */}
      <ConfirmationModal
        opened={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete}"?`}
      />

      {/* Delete All Projects Modal */}
      <ConfirmationModal
        opened={deleteAllModalOpen}
        onClose={closeDeleteAllModal}
        onConfirm={confirmDeleteAllProjects}
        title="Delete All Projects"
        message="Are you sure you want to delete all projects?"
      />

      {/* Success Notification */}
      <NotificationToast
        notification={notification}
        onClose={hideNotification}
      />
    </Stack>
  );
}