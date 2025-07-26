import React, { useState, useEffect, useMemo } from 'react';
import { Container, Stack, Title, Group, Button, SimpleGrid, Text, Notification } from '@mantine/core';
import { Trash2, ArrowLeft, Check } from 'lucide-react';
import { SavedProject } from '../../types/schema';
import { formatProjectCount } from '../../utils/stringFormatters';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { ProjectsEmptyState } from '../../components/ProjectsEmptyState/ProjectsEmptyState';
import { Header } from '../../components/Header/Header';

interface MyProjectsPageProps {
  onNavigateToEditor?: (project?: SavedProject) => void;
  onNavigateToProfile?: () => void;
  onNavigateToHome?: () => void;
  onLogout?: () => void;
}

export function MyProjectsPage({ onNavigateToEditor, onNavigateToProfile, onNavigateToHome, onLogout }: MyProjectsPageProps) {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
    setProjects(savedProjects);
  }, []);

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  const handleDeleteProject = (projectName: string) => {
    setProjectToDelete(projectName);
    setDeleteModalOpen(true);
  };

  const confirmDeleteProject = () => {
    if (!projectToDelete) return;

    const updatedProjects = projects.filter(p => p.name !== projectToDelete);
    setProjects(updatedProjects);
    localStorage.setItem('saved_template_projects', JSON.stringify(updatedProjects));
    
    setNotification('Project deleted successfully');
    setTimeout(() => setNotification(null), 3000);
    
    setProjectToDelete(null);
  };

  const handleDeleteAllProjects = () => {
    setDeleteAllModalOpen(true);
  };

  const confirmDeleteAllProjects = () => {
    setProjects([]);
    localStorage.setItem('saved_template_projects', JSON.stringify([]));
    
    setNotification('All projects deleted successfully');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEditProject = (project: SavedProject) => {
    if (onNavigateToEditor) {
      onNavigateToEditor(project);
    }
  };

  const handleCreateProject = () => {
    if (onNavigateToEditor) {
      onNavigateToEditor();
    }
  };

  return (
    <Stack gap={0} h="100vh" style={{ overflow: 'hidden' }}>
      {/* Header Component */}
      <Header 
        onProfile={onNavigateToProfile}
        onMyProjects={() => {}} // Already on projects page
        onLogOut={onLogout}
        onLogoClick={onNavigateToHome}
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
                  onEdit={handleEditProject}
                />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>

      {/* Delete Project Modal */}
      <ConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete}"?`}
      />

      {/* Delete All Projects Modal */}
      <ConfirmationModal
        opened={deleteAllModalOpen}
        onClose={() => setDeleteAllModalOpen(false)}
        onConfirm={confirmDeleteAllProjects}
        title="Delete All Projects"
        message="Are you sure you want to delete all projects?"
      />

      {/* Success Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <Notification
            icon={<Check size={18} />}
            color="green"
            onClose={() => setNotification(null)}
            withCloseButton
          >
            {notification}
          </Notification>
        </div>
      )}
    </Stack>
  );
}