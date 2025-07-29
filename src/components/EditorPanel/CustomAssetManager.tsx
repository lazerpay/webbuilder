import React, { useState, useCallback, useRef } from 'react';
import {
  Modal,
  Stack,
  Group,
  Button,
  TextInput,
  Text,
  Paper,
  Image,
  ActionIcon,
  Tabs,
  Alert,
  SimpleGrid,
  FileInput,
  rem
} from '@mantine/core';
import { Upload, Link, X, Trash, ImageIcon } from 'lucide-react';

interface Asset {
  id: string;
  src: string;
  name: string;
  type: 'upload' | 'url';
}

interface CustomAssetManagerProps {
  opened: boolean;
  onClose: () => void;
  onAssetSelect: (src: string) => void;
  currentSrc?: string;
}

export function CustomAssetManager({ 
  opened, 
  onClose, 
  onAssetSelect, 
  currentSrc 
}: CustomAssetManagerProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [urlInput, setUrlInput] = useState(currentSrc || '');
  const [activeTab, setActiveTab] = useState<string | null>('upload');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((files: File[]) => {
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newAsset: Asset = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            src: e.target?.result as string,
            name: file.name,
            type: 'upload'
          };
          setAssets(prev => [...prev, newAsset]);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      const newAsset: Asset = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        src: urlInput.trim(),
        name: 'URL Image',
        type: 'url'
      };
      setAssets(prev => [...prev, newAsset]);
      setUrlInput('');
    }
  };

  const handleAssetClick = (src: string) => {
    onAssetSelect(src);
    onClose();
  };

  const handleRemoveAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  const handleUseUrl = () => {
    if (urlInput.trim()) {
      onAssetSelect(urlInput.trim());
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <ImageIcon size={20} />
          <Text fw={600}>Select Image</Text>
        </Group>
      }
      size="lg"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="md">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="upload" leftSection={<Upload size={16} />}>
              Upload
            </Tabs.Tab>
            <Tabs.Tab value="url" leftSection={<Link size={16} />}>
              URL
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="upload" pt="md">
            <Stack gap="md">
              <Paper
                p="xl"
                withBorder
                style={{
                  borderStyle: dragOver ? 'solid' : 'dashed',
                  borderColor: dragOver ? 'var(--mantine-color-blue-4)' : 'var(--mantine-color-gray-4)',
                  backgroundColor: dragOver ? 'var(--mantine-color-blue-0)' : 'var(--mantine-color-gray-0)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <Stack align="center" gap="sm">
                  <Upload size={32} color="var(--mantine-color-gray-6)" />
                  <Text ta="center" c="dimmed">
                    Drop files here or click to upload
                  </Text>
                  <Text size="xs" c="dimmed">
                    Supports: JPG, PNG, GIF, WebP
                  </Text>
                </Stack>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(Array.from(e.target.files));
                    }
                  }}
                />
              </Paper>

              {assets.length > 0 && (
                <Stack gap="sm">
                  <Text size="sm" fw={500}>Uploaded Images</Text>
                  <SimpleGrid cols={3} spacing="sm">
                    {assets.map((asset) => (
                      <Paper
                        key={asset.id}
                        p="xs"
                        withBorder
                        style={{ cursor: 'pointer', position: 'relative' }}
                        onClick={() => handleAssetClick(asset.src)}
                      >
                        <Image
                          src={asset.src}
                          alt={asset.name}
                          h={80}
                          fit="cover"
                          radius="sm"
                        />
                        <ActionIcon
                          size="sm"
                          color="red"
                          variant="filled"
                          style={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveAsset(asset.id);
                          }}
                        >
                          <X size={12} />
                        </ActionIcon>
                        <Text size="xs" truncate mt="xs" ta="center">
                          {asset.name}
                        </Text>
                      </Paper>
                    ))}
                  </SimpleGrid>
                </Stack>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="url" pt="md">
            <Stack gap="md">
              <TextInput
                label="Image URL"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUseUrl();
                  }
                }}
              />
              
              {urlInput && (
                <Paper p="md" withBorder>
                  <Text size="sm" mb="sm" fw={500}>Preview</Text>
                  <Image
                    src={urlInput}
                    alt="Preview"
                    h={200}
                    fit="contain"
                    fallbackSrc="data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f1f3f4'/%3e%3ctext x='50%25' y='50%25' font-size='18' fill='%23666' text-anchor='middle' dy='.3em'%3eNo Image%3c/text%3e%3c/svg%3e"
                  />
                </Paper>
              )}

              <Alert color="blue" variant="light">
                <Text size="sm">
                  Enter a direct link to an image file. Make sure the URL ends with an image extension (.jpg, .png, .gif, etc.)
                </Text>
              </Alert>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          {activeTab === 'url' && (
            <Button 
              onClick={handleUseUrl}
              disabled={!urlInput.trim()}
            >
              Use URL
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}