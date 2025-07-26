import React from 'react';
import { Container, Group, Text, Stack } from '@mantine/core';
import { Heart } from 'lucide-react';
import { Logo } from '../Header/Logo';

export function LandingFooter() {
  return (
    <div
      style={{
        padding: '60px 0 40px',
        background: '#0f172a',
        borderTop: '1px solid #1e293b',
      }}
    >
      <Container size="lg">
        <Stack gap="xl">
          {/* Main Footer Content */}
          <Group justify="space-between" align="flex-start">
            {/* Brand Section */}
            <Stack gap="md" style={{ maxWidth: '300px' }}>
              <Logo size={32} />
              <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ lineHeight: 1.6 }}>
                The most intuitive website builder for creators, businesses, and developers. 
                Build beautiful websites without code.
              </Text>
            </Stack>

            {/* Links Sections */}
            <Group gap="4rem" align="flex-start">
              <Stack gap="md">
                <Text fw={600} c="white" size="sm">
                  Product
                </Text>
                <Stack gap="xs">
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Features
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Templates
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Pricing
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Integrations
                  </Text>
                </Stack>
              </Stack>

              <Stack gap="md">
                <Text fw={600} c="white" size="sm">
                  Company
                </Text>
                <Stack gap="xs">
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    About
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Blog
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Careers
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Contact
                  </Text>
                </Stack>
              </Stack>

              <Stack gap="md">
                <Text fw={600} c="white" size="sm">
                  Support
                </Text>
                <Stack gap="xs">
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Help Center
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Documentation
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Community
                  </Text>
                  <Text size="sm" c="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }}>
                    Status
                  </Text>
                </Stack>
              </Stack>
            </Group>
          </Group>

          {/* Bottom Section */}
          <div
            style={{
              borderTop: '1px solid #1e293b',
              paddingTop: '24px',
            }}
          >
            <Group justify="space-between" align="center">
              <Text size="sm" c="rgba(255, 255, 255, 0.6)">
                © 2024 All rights reserved.
              </Text>
              
              <Group gap="xs" align="center">
                <Text size="sm" c="rgba(255, 255, 255, 0.6)">
                  Made with
                </Text>
                <Heart size={14} color="#ef4444" fill="#ef4444" />
                <Text size="sm" c="rgba(255, 255, 255, 0.6)">
                  for creators
                </Text>
              </Group>
            </Group>
          </div>
        </Stack>
      </Container>
    </div>
  );
}