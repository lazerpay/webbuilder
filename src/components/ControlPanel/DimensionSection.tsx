import { Stack, Group, NumberInput } from '@mantine/core';
import { Maximize } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { SpacingControls } from './SpacingControls';
import { parseNumericValue, getCSSValue } from '../../utils/cssUtils';

interface DimensionSectionProps {
  styles: any;
  onStyleChange: (property: string, value: string | number) => void;
  isDisabled: boolean;
}

export function DimensionSection({ styles, onStyleChange, isDisabled }: DimensionSectionProps) {
  const getCSSValueWithStyles = (property: string, fallback: string = ''): string => {
    return getCSSValue(styles, property, fallback);
  };

  return (
    <CollapsibleSection
      title="Dimension"
      icon={<Maximize size={16} />}
      disabled={isDisabled}
    >
      <Stack gap="xs">
        <Group gap="xs">
          <NumberInput
            label="Width"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('width'))}
            onChange={(value) => onStyleChange('width', Number(value) || 0)}
            min={0}
            allowDecimal={false}
            style={{ flex: 1 }}
          />
          <NumberInput
            label="Max Width"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('max-width'))}
            onChange={(value) => onStyleChange('max-width', Number(value) || 0)}
            min={0}
            allowDecimal={false}
            style={{ flex: 1 }}
          />
        </Group>
        
        <Group gap="xs">
          <NumberInput
            label="Height"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('height'))}
            onChange={(value) => onStyleChange('height', Number(value) || 0)}
            min={0}
            allowDecimal={false}
            style={{ flex: 1 }}
          />
          <NumberInput
            label="Max Height"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('max-height'))}
            onChange={(value) => onStyleChange('max-height', Number(value) || 0)}
            min={0}
            allowDecimal={false}
            style={{ flex: 1 }}
          />
        </Group>

        <SpacingControls
          title="Margin"
          values={{
            top: parseNumericValue(getCSSValueWithStyles('margin-top')),
            right: parseNumericValue(getCSSValueWithStyles('margin-right')),
            bottom: parseNumericValue(getCSSValueWithStyles('margin-bottom')),
            left: parseNumericValue(getCSSValueWithStyles('margin-left'))
          }}
          onChange={onStyleChange}
          prefix="margin"
        />

        <SpacingControls
          title="Padding"
          values={{
            top: parseNumericValue(getCSSValueWithStyles('padding-top')),
            right: parseNumericValue(getCSSValueWithStyles('padding-right')),
            bottom: parseNumericValue(getCSSValueWithStyles('padding-bottom')),
            left: parseNumericValue(getCSSValueWithStyles('padding-left'))
          }}
          onChange={onStyleChange}
          prefix="padding"
        />
      </Stack>
    </CollapsibleSection>
  );
}