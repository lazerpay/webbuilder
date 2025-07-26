import React from 'react';
import { Card, Stack, Text, Group, SimpleGrid, Paper } from '@mantine/core';
import { ChartNoAxesCombined, FolderOpen, Eye, Calendar } from 'lucide-react';
import { formatProjectCount, formatLastLogin } from '../../utils/stringFormatters';
import { UserStats } from '../../types/schema';

interface ActivityStatsCardProps {
  stats: UserStats;
}

export function ActivityStatsCard({ stats }: ActivityStatsCardProps) {
  const statItems = [
    {
      icon: FolderOpen,
      label: 'Total Projects',
      value: stats.totalProjects.toString(),
      color: 'blue'
    },
    {
      icon: FolderOpen,
      label: 'Published',
      value: stats.publishedProjects.toString(),
      color: 'green'
    },
    {
      icon: FolderOpen,
      label: 'Drafts',
      value: stats.draftProjects.toString(),
      color: 'orange'
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      color: 'purple'
    }
  ];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="lg">
        <Group gap="xs">
          <ChartNoAxesCombined size={20} />
          <Text size="lg" fw={600}>
            Activity & Statistics
          </Text>
        </Group>

        <SimpleGrid cols={2} spacing="md">
          {statItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Paper
                key={index}
                p="md"
                radius="md"
                style={{
                  border: '1px solid var(--mantine-color-gray-3)',
                  backgroundColor: 'var(--mantine-color-gray-0)'
                }}
              >
                <Group gap="xs" mb="xs">
                  <IconComponent size={16} color={`var(--mantine-color-${item.color}-6)`} />
                  <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                    {item.label}
                  </Text>
                </Group>
                <Text size="xl" fw={700} c={item.color}>
                  {item.value}
                </Text>
              </Paper>
            );
          })}
        </SimpleGrid>

        <Group gap="xs" c="dimmed">
          <Calendar size={16} />
          <Text size="sm">
            Last activity: {formatLastLogin(stats.lastActivity)}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}