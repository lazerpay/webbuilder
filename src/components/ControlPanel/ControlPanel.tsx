import { useState, useEffect } from 'react';
import { Stack, Group, NumberInput, ColorInput, Select, Text, Title, Divider, ActionIcon, Tooltip } from '@mantine/core';
import { Monitor, Maximize, Type, Palette, Settings, Copy, Check } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';
import { SpacingControls } from './SpacingControls';
import { BorderControls } from './BorderControls';
import { FlexControls } from './FlexControls';
import { BoxShadowControls } from './BoxShadowControls';
import { ALL_STYLE_PROPERTIES, DEFAULT_PROPERTY_VALUES } from './stylePropertiesSchema';

interface ControlPanelProps {
  selectedElement: any;
  onStyleChange: (property: string, value: string) => void;
  displaySectionExpanded?: boolean;
}

export function ControlPanel({ selectedElement, onStyleChange, displaySectionExpanded = false }: ControlPanelProps) {
  const [styles, setStyles] = useState<any>({});
  const [displayType, setDisplayType] = useState('block');
  const [copied, setCopied] = useState(false);
  const [flexValues, setFlexValues] = useState({
    direction: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  });

  // Helper function to parse numeric values from CSS strings
  const parseNumericValue = (value: string | undefined, defaultValue: number = 0): number => {
    if (!value || value === 'auto' || value === 'none' || value === 'inherit') return defaultValue;
    const parsed = parseFloat(value.replace(/px|em|rem|%/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  };

  // Helper function to get CSS property value with fallback
  const getCSSValue = (property: string, fallback: string = ''): string => {
    const value = styles[property] || DEFAULT_PROPERTY_VALUES[property] || fallback;
    return value;
  };

  useEffect(() => {
    if (selectedElement) {
      try {
        // Get the DOM element and computed styles
        const el = selectedElement.getEl();
        const computed = window.getComputedStyle(el);
        
        // Extract styles from computed styles
        const extractedStyles: any = {};
        ALL_STYLE_PROPERTIES.forEach(property => {
          extractedStyles[property] = computed.getPropertyValue(property);
        });
        
        console.log('Extracted styles from computed:', extractedStyles);
        
        setStyles(extractedStyles);
        setDisplayType(extractedStyles.display || DEFAULT_PROPERTY_VALUES.display || 'block');
        
        // Update flex values
        setFlexValues({
          direction: extractedStyles['flex-direction'] || 'row',
          alignItems: extractedStyles['align-items'] || 'stretch',
          justifyContent: extractedStyles['justify-content'] || 'flex-start'
        });
      } catch (error) {
        console.error('Error getting element styles:', error);
        setStyles({});
      }
    } else {
      setStyles({});
      setDisplayType('block');
      setFlexValues({
        direction: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
      });
    }
  }, [selectedElement]);

  const handleStyleChange = (property: string, value: string | number) => {
    let stringValue: string;
    
    if (property === 'opacity') {
      // Handle opacity as a decimal value without units
      stringValue = value.toString();
    } else if (typeof value === 'number') {
      stringValue = `${value}px`;
    } else {
      stringValue = value.toString();
    }
    
    onStyleChange(property, stringValue);
    
    // Update local state to reflect changes
    setStyles(prev => ({ ...prev, [property]: stringValue }));
    
    if (property === 'display') {
      setDisplayType(stringValue);
    }
    
    // Update flex values when flex properties change
    if (property === 'flex-direction') {
      setFlexValues(prev => ({ ...prev, direction: stringValue }));
    } else if (property === 'align-items') {
      setFlexValues(prev => ({ ...prev, alignItems: stringValue }));
    } else if (property === 'justify-content') {
      setFlexValues(prev => ({ ...prev, justifyContent: stringValue }));
    }
  };

  const handleCopyStyles = async () => {
    if (!selectedElement) return;
    
    try {
      const styleEntries: string[] = [];
      
      // Get current styles from the element
      const elementStyles = selectedElement.getStyle ? selectedElement.getStyle() : {};
      
      // Copy only the properties that are shown in the styles panel
      ALL_STYLE_PROPERTIES.forEach(property => {
        let value = elementStyles[property];
        
        // If property doesn't exist in element styles, use default value
        if (!value || value === undefined || value === null) {
          value = DEFAULT_PROPERTY_VALUES[property] || '';
        }
        
        // Only add if we have a value
        if (value) {
          styleEntries.push(`${property}: ${value};`);
        }
      });
      
      const cssText = styleEntries.join('\n');
      await navigator.clipboard.writeText(cssText || 'No styles found');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy styles:', error);
    }
  };

  const isDisabled = !selectedElement;

  return (
    <div style={{ padding: '16px' }}>
      <Stack gap={0}>
      {/* Display Section */}
      <CollapsibleSection
        title="Display"
        icon={<Monitor size={16} />}
        defaultOpen={displaySectionExpanded || true}
        disabled={isDisabled}
      >
        <Stack gap="xs">
          <Group gap="xs">
            <Select
              label="Display"
              size="xs"
              value={displayType}
              onChange={(value) => handleStyleChange('display', value || 'block')}
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
              value={getCSSValue('position', 'static')}
              onChange={(value) => handleStyleChange('position', value || 'static')}
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
              value={parseNumericValue(getCSSValue('top'))}
              onChange={(value) => handleStyleChange('top', Number(value) || 0)}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
            <NumberInput
              label="Right"
              size="xs"
              value={parseNumericValue(getCSSValue('right'))}
              onChange={(value) => handleStyleChange('right', Number(value) || 0)}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
          </Group>
          
          <Group gap="xs">
            <NumberInput
              label="Bottom"
              size="xs"
              value={parseNumericValue(getCSSValue('bottom'))}
              onChange={(value) => handleStyleChange('bottom', Number(value) || 0)}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
            <NumberInput
              label="Left"
              size="xs"
              value={parseNumericValue(getCSSValue('left'))}
              onChange={(value) => handleStyleChange('left', Number(value) || 0)}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
          </Group>

          {displayType === 'flex' && (
            <FlexControls
              values={flexValues}
              onChange={handleStyleChange}
            />
          )}
        </Stack>
      </CollapsibleSection>

      {/* Dimension Section */}
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
              value={parseNumericValue(getCSSValue('width'))}
              onChange={(value) => handleStyleChange('width', Number(value) || 0)}
              min={0}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
            <NumberInput
              label="Max Width"
              size="xs"
              value={parseNumericValue(getCSSValue('max-width'))}
              onChange={(value) => handleStyleChange('max-width', Number(value) || 0)}
              min={0}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
          </Group>
          
          <Group gap="xs">
            <NumberInput
              label="Height"
              size="xs"
              value={parseNumericValue(getCSSValue('height'))}
              onChange={(value) => handleStyleChange('height', Number(value) || 0)}
              min={0}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
            <NumberInput
              label="Max Height"
              size="xs"
              value={parseNumericValue(getCSSValue('max-height'))}
              onChange={(value) => handleStyleChange('max-height', Number(value) || 0)}
              min={0}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
          </Group>

          <SpacingControls
            title="Margin"
            values={{
              top: parseNumericValue(getCSSValue('margin-top')),
              right: parseNumericValue(getCSSValue('margin-right')),
              bottom: parseNumericValue(getCSSValue('margin-bottom')),
              left: parseNumericValue(getCSSValue('margin-left'))
            }}
            onChange={handleStyleChange}
            prefix="margin"
          />

          <SpacingControls
            title="Padding"
            values={{
              top: parseNumericValue(getCSSValue('padding-top')),
              right: parseNumericValue(getCSSValue('padding-right')),
              bottom: parseNumericValue(getCSSValue('padding-bottom')),
              left: parseNumericValue(getCSSValue('padding-left'))
            }}
            onChange={handleStyleChange}
            prefix="padding"
          />
        </Stack>
      </CollapsibleSection>

      {/* Typography Section */}
      <CollapsibleSection
        title="Typography"
        icon={<Type size={16} />}
        disabled={isDisabled}
      >
        <Stack gap="xs">
          <Select
            label="Font Family"
            size="xs"
            value={getCSSValue('font-family', 'inherit')}
            onChange={(value) => handleStyleChange('font-family', value || 'inherit')}
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
              value={parseNumericValue(getCSSValue('font-size'), 16)}
              onChange={(value) => handleStyleChange('font-size', Number(value) || 16)}
              min={8}
              max={72}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
            <NumberInput
              label="Font Weight"
              size="xs"
              value={parseNumericValue(getCSSValue('font-weight'), 400)}
              onChange={(value) => handleStyleChange('font-weight', Number(value) || 400)}
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
            value={getCSSValue('color', '#000000')}
            onChange={(value) => handleStyleChange('color', value)}
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
              value={parseNumericValue(getCSSValue('letter-spacing'))}
              onChange={(value) => handleStyleChange('letter-spacing', Number(value) || 0)}
              allowDecimal={false}
              style={{ flex: 1 }}
            />
            <NumberInput
              label="Line Height"
              size="xs"
              value={parseNumericValue(getCSSValue('line-height'), 1.5)}
              onChange={(value) => handleStyleChange('line-height', Number(value) || 1.5)}
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
              value={getCSSValue('text-align', 'left')}
              onChange={(value) => handleStyleChange('text-align', value || 'left')}
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
              value={getCSSValue('text-decoration', 'none')}
              onChange={(value) => handleStyleChange('text-decoration', value || 'none')}
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

      {/* Decoration Section */}
      <CollapsibleSection
        title="Decoration"
        icon={<Palette size={16} />}
        disabled={isDisabled}
      >
        <Stack gap="xs">
          <ColorInput
            label="Background Color"
            size="xs"
            value={getCSSValue('background-color', 'transparent')}
            onChange={(value) => handleStyleChange('background-color', value)}
            withPicker
            swatches={[
              '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da',
              '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529',
              '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'
            ]}
            swatchesPerRow={5}
          />

          <BoxShadowControls
            value={getCSSValue('box-shadow', 'none')}
            onChange={handleStyleChange}
          />

          <BorderControls
            values={{
              width: parseNumericValue(getCSSValue('border-width')),
              color: getCSSValue('border-color', '#000000'),
              style: getCSSValue('border-style', 'solid'),
              radiusTop: parseNumericValue(getCSSValue('border-top-left-radius')),
              radiusRight: parseNumericValue(getCSSValue('border-top-right-radius')),
              radiusBottom: parseNumericValue(getCSSValue('border-bottom-left-radius')),
              radiusLeft: parseNumericValue(getCSSValue('border-bottom-right-radius'))
            }}
            onChange={handleStyleChange}
          />
        </Stack>
      </CollapsibleSection>

      {/* Extra Section */}
      <CollapsibleSection
        title="Extra"
        icon={<Settings size={16} />}
        disabled={isDisabled}
      >
        <Stack gap="xs">
          <NumberInput
            label="Opacity"
            size="xs"
            value={parseNumericValue(getCSSValue('opacity'), 1)}
            onChange={(value) => handleStyleChange('opacity', Number(value) || 1)}
            min={0}
            max={1}
            step={0.1}
            decimalScale={1}
          />

          <NumberInput
            label="Z-Index"
            size="xs"
            value={parseNumericValue(getCSSValue('z-index'))}
            onChange={(value) => handleStyleChange('z-index', Number(value) || 0)}
            allowDecimal={false}
          />
        </Stack>
      </CollapsibleSection>
      </Stack>
    </div>
  );
}

// Export the copy function for use in parent component
export const useCopyStyles = (selectedElement: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopyStyles = async () => {
    if (!selectedElement) return;
    
    try {
      const styleEntries: string[] = [];
      
      // Get current styles from the element
      const elementStyles = selectedElement.getStyle ? selectedElement.getStyle() : {};
      
      // Copy only the properties that are shown in the styles panel
      ALL_STYLE_PROPERTIES.forEach(property => {
        let value = elementStyles[property];
        
        // If property doesn't exist in element styles, use default value
        if (!value || value === undefined || value === null) {
          value = DEFAULT_PROPERTY_VALUES[property] || '';
        }
        
        // Only add if we have a value
        if (value) {
          styleEntries.push(`${property}: ${value};`);
        }
      });
      
      const cssText = styleEntries.join('\n');
      await navigator.clipboard.writeText(cssText || 'No styles found');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy styles:', error);
    }
  };

  return { copied, handleCopyStyles };
};