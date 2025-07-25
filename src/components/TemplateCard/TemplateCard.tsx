import { Card, Image, Text, Stack, Button, Skeleton, Center } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { Template } from '../../services/templateService';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
  loading?: boolean;
}

export function TemplateCard({ template, isSelected, onSelect, loading = false }: TemplateCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      style={{
        cursor: 'pointer',
        border: isSelected ? '2px solid var(--mantine-color-primary-6)' : undefined,
        backgroundColor: isSelected ? 'var(--mantine-color-primary-0)' : undefined,
        opacity: loading ? 0.7 : 1
      }}
      onClick={() => !loading && onSelect(template)}
    >
      <Card.Section>
        {imageLoading && !imageError && (
          <Skeleton height={120} />
        )}
        <Image
          src={template.thumbnailUrl}
          height={120}
          alt={template.name}
          fit="cover"
          fallbackSrc="https://placehold.co/400x300/e2e8f0/64748b?text=Template"
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
          style={{ 
            display: imageLoading ? 'none' : 'block' 
          }}
        />
      </Card.Section>

      <Stack gap="xs" mt="md">
        <Text fw={600} size="sm">
          {template.name}
        </Text>
        <Text size="xs" c="dimmed" lineClamp={2}>
          {template.description}
        </Text>
        <Button
          variant="light"
          size="xs"
          leftSection={<SquarePen size={14} />}
          fullWidth
          loading={loading && isSelected}
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            if (!loading) onSelect(template);
          }}
        >
          {loading && isSelected ? "Loading..." : "Edit Template"}
        </Button>
      </Stack>
    </Card>
  );
}