import React from 'react';
import { Group, NumberInput, ColorInput, Select, Text } from '@mantine/core';

interface BorderControlsProps {
  values: {
    width: number;
    color: string;
    style: string;
    radiusTop: number;
    radiusRight: number;
    radiusBottom: number;
    radiusLeft: number;
  };
  onChange: (property: string, value: string | number) => void;
}

export function BorderControls({ values, onChange }: BorderControlsProps) {
  return (
    <>
      <Text size="xs" fw={500} mb="xs">Border</Text>
      <Group gap="xs">
        <NumberInput
          label="Width"
          size="xs"
          value={values.width}
          onChange={(value) => onChange('border-width', Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
        <Select
          label="Style"
          size="xs"
          value={values.style}
          onChange={(value) => onChange('border-style', value || 'solid')}
          data={[
            { value: 'solid', label: 'Solid' },
            { value: 'dashed', label: 'Dashed' },
            { value: 'dotted', label: 'Dotted' },
            { value: 'none', label: 'None' }
          ]}
          style={{ flex: 1 }}
        />
      </Group>
      <ColorInput
        label="Border Color"
        size="xs"
        value={values.color}
        onChange={(value) => onChange('border-color', value)}
      />
      
      <Text size="xs" fw={500} mb="xs" mt="md">Border Radius</Text>
      <Group gap="xs">
        <NumberInput
          label="Top Left"
          size="xs"
          value={values.radiusTop}
          onChange={(value) => onChange('border-top-left-radius', Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
        <NumberInput
          label="Top Right"
          size="xs"
          value={values.radiusRight}
          onChange={(value) => onChange('border-top-right-radius', Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
      </Group>
      <Group gap="xs">
        <NumberInput
          label="Bottom Left"
          size="xs"
          value={values.radiusBottom}
          onChange={(value) => onChange('border-bottom-left-radius', Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
        <NumberInput
          label="Bottom Right"
          size="xs"
          value={values.radiusLeft}
          onChange={(value) => onChange('border-bottom-right-radius', Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
      </Group>
    </>
  );
}