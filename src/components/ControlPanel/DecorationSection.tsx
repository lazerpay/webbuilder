import { Stack, ColorInput } from '@mantine/core';
import { Palette } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { BoxShadowControls } from './BoxShadowControls';
import { BorderControls } from './BorderControls';
import { parseNumericValue, getCSSValue } from '../../utils/cssUtils';

interface DecorationSectionProps {
  styles: any;
  onStyleChange: (property: string, value: string | number) => void;
  isDisabled: boolean;
}

export function DecorationSection({ styles, onStyleChange, isDisabled }: DecorationSectionProps) {
  const getCSSValueWithStyles = (property: string, fallback: string = ''): string => {
    return getCSSValue(styles, property, fallback);
  };

  return (
    <CollapsibleSection
      title="Decoration"
      icon={<Palette size={16} />}
      disabled={isDisabled}
    >
      <Stack gap="xs">
        <ColorInput
          label="Background Color"
          size="xs"
          value={getCSSValueWithStyles('background-color', 'transparent')}
          onChange={(value) => onStyleChange('background-color', value)}
          withPicker
          swatches={[
            '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da',
            '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529',
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'
          ]}
          swatchesPerRow={5}
        />

        <BoxShadowControls
          value={getCSSValueWithStyles('box-shadow', 'none')}
          onChange={onStyleChange}
        />

        <BorderControls
          values={{
            width: parseNumericValue(getCSSValueWithStyles('border-width')),
            color: getCSSValueWithStyles('border-color', '#000000'),
            style: getCSSValueWithStyles('border-style', 'solid'),
            radiusTop: parseNumericValue(getCSSValueWithStyles('border-top-left-radius')),
            radiusRight: parseNumericValue(getCSSValueWithStyles('border-top-right-radius')),
            radiusBottom: parseNumericValue(getCSSValueWithStyles('border-bottom-left-radius')),
            radiusLeft: parseNumericValue(getCSSValueWithStyles('border-bottom-right-radius'))
          }}
          onChange={onStyleChange}
        />
      </Stack>
    </CollapsibleSection>
  );
}