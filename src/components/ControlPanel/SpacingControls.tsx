import React from 'react';
import { Group, NumberInput, Text } from '@mantine/core';

interface SpacingControlsProps {
  title: string;
  values: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  onChange: (property: string, value: string | number) => void;
  prefix: string;
}

export function SpacingControls({ title, values, onChange, prefix }: SpacingControlsProps) {
  return (
    <>
      <Text size="xs" fw={500} mb="xs">{title}</Text>
      <Group gap="xs">
        <NumberInput
          label="Top"
          size="xs"
          value={values.top}
          onChange={(value) => onChange(`${prefix}-top`, Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
        <NumberInput
          label="Right"
          size="xs"
          value={values.right}
          onChange={(value) => onChange(`${prefix}-right`, Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
      </Group>
      <Group gap="xs">
        <NumberInput
          label="Bottom"
          size="xs"
          value={values.bottom}
          onChange={(value) => onChange(`${prefix}-bottom`, Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
        <NumberInput
          label="Left"
          size="xs"
          value={values.left}
          onChange={(value) => onChange(`${prefix}-left`, Number(value) || 0)}
          min={0}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
      </Group>
    </>
  );
}