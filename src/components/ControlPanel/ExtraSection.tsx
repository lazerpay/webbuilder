import { Stack, NumberInput } from '@mantine/core';
import { Settings } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { parseNumericValue, getCSSValue } from '../../utils/cssUtils';

interface ExtraSectionProps {
  styles: any;
  onStyleChange: (property: string, value: string | number) => void;
  isDisabled: boolean;
}

export function ExtraSection({ styles, onStyleChange, isDisabled }: ExtraSectionProps) {
  const getCSSValueWithStyles = (property: string, fallback: string = ''): string => {
    return getCSSValue(styles, property, fallback);
  };

  return (
    <CollapsibleSection
      title="Extra"
      icon={<Settings size={16} />}
      disabled={isDisabled}
    >
      <Stack gap="xs">
        <NumberInput
          label="Opacity"
          size="xs"
          value={parseNumericValue(getCSSValueWithStyles('opacity'), 1)}
          onChange={(value) => onStyleChange('opacity', Number(value) || 1)}
          min={0}
          max={1}
          step={0.1}
          decimalScale={1}
        />

        <NumberInput
          label="Z-Index"
          size="xs"
          value={parseNumericValue(getCSSValueWithStyles('z-index'))}
          onChange={(value) => onStyleChange('z-index', Number(value) || 0)}
          allowDecimal={false}
        />
      </Stack>
    </CollapsibleSection>
  );
}