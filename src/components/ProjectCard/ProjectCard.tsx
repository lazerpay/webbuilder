import React from 'react';
import { Card, Image, Text, Stack, ActionIcon, Group, Badge } from '@mantine/core';
import { Trash2, Edit } from 'lucide-react';
import { SavedProject } from '../../types/schema';
import { formatProjectDate } from '../../utils/stringFormatters';
import { projectService } from '../../services/projectService';
import { useNavigation } from '../../hooks/useNavigation';

interface ProjectCardProps {
  project: SavedProject;
  onDelete: (projectName: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const { navigateToEditor } = useNavigation();
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(project.name);
  };

  const handleEdit = () => {
    // Store project in sessionStorage and navigate to editor
    projectService.setCurrentProjectFromSaved(project);
    navigateToEditor();
  };

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      style={{ cursor: 'pointer', height: '100%' }}
      onClick={handleEdit}
    >
      <Card.Section>
        <div
          style={{
            width: '100%',
            height: '160px',
            backgroundColor: 'var(--mantine-color-gray-1)',
            border: '1px solid var(--mantine-color-gray-3)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={`${project.name} thumbnail`}
              fit="cover"
              w="100%"
              h="100%"
            />
          ) : (
            <Edit size={32} color="var(--mantine-color-gray-5)" />
          )}
        </div>
      </Card.Section>

      <Stack gap="sm" mt="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
            <Text fw={600} size="sm" truncate>
              {project.name}
            </Text>
            <Group gap="xs" align="center">
              <Badge size="xs" variant="light" color="blue">
                v{project.version}
              </Badge>
              <Text size="xs" c="dimmed">
                Saved on {formatProjectDate(project.savedAt)}
              </Text>
            </Group>
          </Stack>
          
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={handleDelete}
            style={{ flexShrink: 0 }}
          >
            <Trash2 size={16} />
          </ActionIcon>
        </Group>
      </Stack>
    </Card>
  );
}