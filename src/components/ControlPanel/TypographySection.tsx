import { Stack, Group, NumberInput, ColorInput, Select } from '@mantine/core';
import { Type } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { parseNumericValue, getCSSValue } from '../../utils/cssUtils';

interface TypographySectionProps {
  styles: any;
  onStyleChange: (property: string, value: string | number) => void;
  isDisabled: boolean;
}

export function TypographySection({ styles, onStyleChange, isDisabled }: TypographySectionProps) {
  const getCSSValueWithStyles = (property: string, fallback: string = ''): string => {
    return getCSSValue(styles, property, fallback);
  };

  return (
    <CollapsibleSection
      title="Typography"
      icon={<Type size={16} />}
      disabled={isDisabled}
    >
      <Stack gap="xs">
        <Select
          label="Font Family"
          size="xs"
          value={getCSSValueWithStyles('font-family', 'inherit')}
          onChange={(value) => onStyleChange('font-family', value || 'inherit')}
          data={[
            { value: 'inherit', label: 'Inherit' },
            { value: 'Arial, sans-serif', label: 'Arial' },
            { value: 'Georgia, serif', label: 'Georgia' },
            { value: 'Times New Roman, serif', label: 'Times New Roman' },
            { value: 'Courier New, monospace', label: 'Courier New' },
            { value: 'Helvetica, sans-serif', label: 'Helvetica' }
          ]}
        />
        
        <Group gap="xs">
          <NumberInput
            label="Font Size"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('font-size'), 16)}
            onChange={(value) => onStyleChange('font-size', Number(value) || 16)}
            min={8}
            max={72}
            allowDecimal={false}
            style={{ flex: 1 }}
          />
          <NumberInput
            label="Font Weight"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('font-weight'), 400)}
            onChange={(value) => onStyleChange('font-weight', Number(value) || 400)}
            min={100}
            max={900}
            step={100}
            allowDecimal={false}
            style={{ flex: 1 }}
          />
        </Group>

        <ColorInput
          label="Text Color"
          size="xs"
          value={getCSSValueWithStyles('color', '#000000')}
          onChange={(value) => onStyleChange('color', value)}
          withPicker
          swatches={[
            '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
            '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
            '#ffc0cb', '#a52a2a', '#808080', '#008000', '#000080'
          ]}
          swatchesPerRow={5}
        />

        <Group gap="xs">
          <NumberInput
            label="Letter Spacing"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('letter-spacing'))}
            onChange={(value) => onStyleChange('letter-spacing', Number(value) || 0)}
            allowDecimal={false}
            style={{ flex: 1 }}
          />
          <NumberInput
            label="Line Height"
            size="xs"
            value={parseNumericValue(getCSSValueWithStyles('line-height'), 1.5)}
            onChange={(value) => onStyleChange('line-height', Number(value) || 1.5)}
            step={0.1}
            min={0.5}
            max={3}
            decimalScale={1}
            style={{ flex: 1 }}
          />
        </Group>

        <Group gap="xs">
          <Select
            label="Text Align"
            size="xs"
            value={getCSSValueWithStyles('text-align', 'left')}
            onChange={(value) => onStyleChange('text-align', value || 'left')}
            data={[
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
              { value: 'right', label: 'Right' },
              { value: 'justify', label: 'Justify' }
            ]}
            style={{ flex: 1 }}
          />
          <Select
            label="Text Decoration"
            size="xs"
            value={getCSSValueWithStyles('text-decoration', 'none')}
            onChange={(value) => onStyleChange('text-decoration', value || 'none')}
            data={[
              { value: 'none', label: 'None' },
              { value: 'underline', label: 'Underline' },
              { value: 'line-through', label: 'Line Through' },
              { value: 'overline', label: 'Overline' }
            ]}
            style={{ flex: 1 }}
          />
        </Group>
      </Stack>
    </CollapsibleSection>
  );
}