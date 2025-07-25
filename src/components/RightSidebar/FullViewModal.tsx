import React from 'react';
import { Modal, Tabs, ScrollArea } from '@mantine/core';
import { PrismCodeBlock } from './PrismCodeBlock';

interface FullViewModalProps {
  opened: boolean;
  onClose: () => void;
  htmlContent: string;
  cssContent: string;
}

export function FullViewModal({ opened, onClose, htmlContent, cssContent }: FullViewModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Code Preview"
      size="90%"
      centered
      styles={{
        body: { padding: 0 },
        content: { height: '80vh' }
      }}
    >
      <Tabs defaultValue="html" style={{ height: '100%' }}>
        <Tabs.List px="md" pt="md">
          <Tabs.Tab value="html">HTML</Tabs.Tab>
          <Tabs.Tab value="css">CSS</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="html" style={{ height: 'calc(100% - 60px)' }}>
          <ScrollArea style={{ height: '100%' }} p="md">
            <PrismCodeBlock
              code={htmlContent}
              language="html"
              style={{ height: '100%' }}
            />
          </ScrollArea>
        </Tabs.Panel>

        <Tabs.Panel value="css" style={{ height: 'calc(100% - 60px)' }}>
          <ScrollArea style={{ height: '100%' }} p="md">
            <PrismCodeBlock
              code={cssContent}
              language="css"
              style={{ height: '100%' }}
            />
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}