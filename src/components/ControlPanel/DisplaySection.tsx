import { Group, NumberInput, Select } from '@mantine/core';
import { Monitor } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { FlexControls } from './FlexControls';
import { parseNumericValue, getCSSValue } from '../../utils/cssUtils';

interface DisplaySectionProps {
  styles: any;
  displayType: string;
  flexValues: {
    direction: string;
    alignItems: string;
    justifyContent: string;
  };
  onStyleChange: (property: string, value: string | number) => void;
  isDisabled: boolean;
  defaultOpen?: boolean;
}

export function DisplaySection({
  styles,
  displayType,
  flexValues,
  onStyleChange,
  isDisabled,
  defaultOpen = true
}: DisplaySectionProps) {
  const getCSSValueWithStyles = (property: string, fallback: string = ''): string => {
    return getCSSValue(styles, property, fallback);
  };

  return (
    <CollapsibleSection
      title="Display"
      icon={<Monitor size={16} />}
      defaultOpen={defaultOpen}
      disabled={isDisabled}
    >
      <Group gap="xs">
        <Select
          label="Display"
          size="xs"
          value={displayType}
          onChange={(value) => onStyleChange('display', value || 'block')}
          data={[
            { value: 'block', label: 'Block' },
            { value: 'inline', label: 'Inline' },
            { value: 'inline-block', label: 'Inline Block' },
            { value: 'flex', label: 'Flex' },
            { value: 'grid', label: 'Grid' },
            { value: 'none', label: 'None' }
          ]}
          style={{ flex: 1 }}
        />
        <Select
          label="Position"
          size="xs"
          value={getCSSValueWithStyles('position', 'static')}
          onChange={(value) => onStyleChange('position', value || 'static')}
          data={[
            { value: 'static', label: 'Static' },
            { value: 'relative', label: 'Relative' },
            { value: 'absolute', label: 'Absolute' },
            { value: 'fixed', label: 'Fixed' },
            { value: 'sticky', label: 'Sticky' }
          ]}
          style={{ flex: 1 }}
        />
      </Group>
      
      <Group gap="xs">
        <NumberInput
          label="Top"
          size="xs"
          value={parseNumericValue(getCSSValueWithStyles('top'))}
          onChange={(value) => onStyleChange('top', Number(value) || 0)}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
        <NumberInput
          label="Right"
          size="xs"
          value={parseNumericValue(getCSSValueWithStyles('right'))}
          onChange={(value) => onStyleChange('right', Number(value) || 0)}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
      </Group>
      
      <Group gap="xs">
        <NumberInput
          label="Bottom"
          size="xs"
          value={parseNumericValue(getCSSValueWithStyles('bottom'))}
          onChange={(value) => onStyleChange('bottom', Number(value) || 0)}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
        <NumberInput
          label="Left"
          size="xs"
          value={parseNumericValue(getCSSValueWithStyles('left'))}
          onChange={(value) => onStyleChange('left', Number(value) || 0)}
          allowDecimal={false}
          style={{ flex: 1 }}
        />
      </Group>

      {displayType === 'flex' && (
        <FlexControls
          values={flexValues}
          onChange={onStyleChange}
        />
      )}
    </CollapsibleSection>
  );
}