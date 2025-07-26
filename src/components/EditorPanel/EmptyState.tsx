import React, { useState, useEffect } from 'react';
import { Stack, Text, Center, Button, Group } from '@mantine/core';
import { FolderOpen } from 'lucide-react';
import { Logo } from '../Header/Logo';
import { SavedProjectsModal } from '../Header/SavedProjectsModal';

interface EmptyStateProps {
  onSelectTemplate?: () => void;
  onProjectLoad?: (project: any) => void;
}

export function EmptyState({ onSelectTemplate, onProjectLoad }: EmptyStateProps) {
  const [savedProjectsModalOpen, setSavedProjectsModalOpen] = useState(false);
  const [hasSavedProjects, setHasSavedProjects] = useState(false);

  useEffect(() => {
    // Check if there are saved projects
    const savedProjects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
    setHasSavedProjects(savedProjects.length > 0);
  }, []);

  const handleProjectSelect = (project: any) => {
    setSavedProjectsModalOpen(false);
    if (onProjectLoad) {
      onProjectLoad(project);
    }
  };

  return (
    <>
      <Center h="100%">
        <Stack align="center" gap="lg">
          <Logo size={80} />
          
          <Text 
            fz="md" 
            c="dimmed" 
            ta="center"
            style={{ maxWidth: '500px', lineHeight: 1.6 }}
          >
            {hasSavedProjects 
              ? "Select a template or choose an existing project to get started"
              : "Select a template to start editing"
            }
          </Text>

          <Group gap="md">
            <Button
              variant="filled"
              size="md"
              onClick={onSelectTemplate}
            >
              Select Template
            </Button>

            {hasSavedProjects && (
              <Button
                variant="light"
                size="md"
                leftSection={<FolderOpen size={16} />}
                onClick={() => setSavedProjectsModalOpen(true)}
              >
                Open Existing Project
              </Button>
            )}
          </Group>
        </Stack>
      </Center>

      <SavedProjectsModal
        opened={savedProjectsModalOpen}
        onClose={() => setSavedProjectsModalOpen(false)}
        onProjectSelect={handleProjectSelect}
      />
    </>
  );
}