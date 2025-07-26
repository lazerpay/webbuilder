import React from 'react';
import { Stack, Text, Center, Button } from '@mantine/core';
import { FolderOpen, Plus } from 'lucide-react';

interface ProjectsEmptyStateProps {
  hasSearchQuery?: boolean;
  onCreateProject?: () => void;
}

export function ProjectsEmptyState({ hasSearchQuery = false, onCreateProject }: ProjectsEmptyStateProps) {
  return (
    <Center h="400px">
      <Stack align="center" gap="lg">
        <FolderOpen size={64} color="var(--mantine-color-gray-5)" />
        
        <Stack align="center" gap="xs">
          <Text size="lg" fw={600} c="dimmed">
            {hasSearchQuery ? "No projects found" : "No projects yet"}
          </Text>
          <Text size="sm" c="dimmed" ta="center" style={{ maxWidth: '300px' }}>
            {hasSearchQuery 
              ? "Try adjusting your search terms to find what you're looking for."
              : "Create your first project to get started with building amazing web experiences."
            }
          </Text>
        </Stack>

        {!hasSearchQuery && onCreateProject && (
          <Button
            leftSection={<Plus size={16} />}
            variant="light"
            size="md"
            onClick={onCreateProject}
          >
            Create New Project
          </Button>
        )}
      </Stack>
    </Center>
  );
}