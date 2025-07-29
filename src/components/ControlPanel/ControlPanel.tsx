import { useState, useEffect } from 'react';
import { Stack } from '@mantine/core';
import { ALL_STYLE_PROPERTIES, DEFAULT_PROPERTY_VALUES } from './stylePropertiesSchema';
import { DisplaySection } from './DisplaySection';
import { DimensionSection } from './DimensionSection';
import { TypographySection } from './TypographySection';
import { DecorationSection } from './DecorationSection';
import { ExtraSection } from './ExtraSection';
import { copyStylesToClipboard } from '../../utils/cssUtils';
import { useToggle } from '../../hooks/useToggle';

interface ControlPanelProps {
  selectedElement: any;
  onStyleChange: (property: string, value: string) => void;
  displaySectionExpanded?: boolean;
}

export function ControlPanel({ selectedElement, onStyleChange, displaySectionExpanded = false }: ControlPanelProps) {
  const [styles, setStyles] = useState<any>({});
  const [displayType, setDisplayType] = useState('block');
  const [flexValues, setFlexValues] = useState({
    direction: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  });

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

  const isDisabled = !selectedElement;

  return (
    <div style={{ padding: '16px' }}>
      <Stack gap={0}>
        <DisplaySection
          styles={styles}
          displayType={displayType}
          flexValues={flexValues}
          onStyleChange={handleStyleChange}
          isDisabled={isDisabled}
          defaultOpen={displaySectionExpanded}
        />

        <DimensionSection
          styles={styles}
          onStyleChange={handleStyleChange}
          isDisabled={isDisabled}
        />

        <TypographySection
          styles={styles}
          onStyleChange={handleStyleChange}
          isDisabled={isDisabled}
        />

        <DecorationSection
          styles={styles}
          onStyleChange={handleStyleChange}
          isDisabled={isDisabled}
        />

        <ExtraSection
          styles={styles}
          onStyleChange={handleStyleChange}
          isDisabled={isDisabled}
        />
      </Stack>
    </div>
  );
}

// Export the copy function for use in parent component
export const useCopyStyles = (selectedElement: any) => {
  const [copied, { setTrue: setCopiedTrue, setFalse: setCopiedFalse }] = useToggle(false);

  const handleCopyStyles = async () => {
    if (!selectedElement) return;
    
    const elementStyles = selectedElement.getStyle ? selectedElement.getStyle() : {};
    const success = await copyStylesToClipboard(elementStyles, ALL_STYLE_PROPERTIES);
    
    if (success) {
      setCopiedTrue();
      setTimeout(setCopiedFalse, 2000);
    }
  };

  return { copied, handleCopyStyles };
};