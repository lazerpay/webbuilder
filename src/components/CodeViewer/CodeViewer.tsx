import { useState } from 'react';
import { Paper, Stack, Title, Code, Button, Tabs, ScrollArea, Text, Group } from '@mantine/core';
import { Download, Copy, Check } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

export function CodeViewer() {
  const { editorContent, selectedTemplate } = useAppSelector((state) => state.template);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Template</title>
    <style>
${editorContent.css}
    </style>
</head>
<body>
${editorContent.html}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(editorContent.html);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  };

  const handleCopyCss = async () => {
    try {
      await navigator.clipboard.writeText(editorContent.css);
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  if (!selectedTemplate) {
    return (
      <Paper h="100%" withBorder p="md">
        <Stack align="center" justify="center" h="100%">
          <Text size="sm" c="dimmed" ta="center">
            Real-time HTML and CSS code will appear here when you select and edit a template
          </Text>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper h="100%" withBorder>
      <Stack gap={0} h="100%">
        <Group justify="space-between" p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
          <Title order={4} size="h5">
            Generated Code
          </Title>
          <Button
            size="xs"
            leftSection={<Download size={14} />}
            onClick={handleDownload}
            disabled={!editorContent.html && !editorContent.css}
          >
            Download
          </Button>
        </Group>

        <Tabs defaultValue="html" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Tabs.List>
            <Tabs.Tab value="html">HTML</Tabs.Tab>
            <Tabs.Tab value="css">CSS</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="html" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Group justify="space-between" p="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
              <Text size="sm" fw={500}>HTML Code</Text>
              <Button
                size="xs"
                variant="subtle"
                leftSection={copiedHtml ? <Check size={12} /> : <Copy size={12} />}
                onClick={handleCopyHtml}
                color={copiedHtml ? 'green' : undefined}
              >
                {copiedHtml ? 'Copied!' : 'Copy'}
              </Button>
            </Group>
            <ScrollArea style={{ flex: 1 }} p="sm">
              <Code block style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                {editorContent.html || '<!-- HTML code will appear here -->'}
              </Code>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="css" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Group justify="space-between" p="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
              <Text size="sm" fw={500}>CSS Code</Text>
              <Button
                size="xs"
                variant="subtle"
                leftSection={copiedCss ? <Check size={12} /> : <Copy size={12} />}
                onClick={handleCopyCss}
                color={copiedCss ? 'green' : undefined}
              >
                {copiedCss ? 'Copied!' : 'Copy'}
              </Button>
            </Group>
            <ScrollArea style={{ flex: 1 }} p="sm">
              <Code block style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                {editorContent.css || '/* CSS code will appear here */'}
              </Code>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Paper>
  );
}