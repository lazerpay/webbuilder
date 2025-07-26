import React from 'react';
import { Container, Stack, Title, Text, SimpleGrid, Card, Group } from '@mantine/core';
import { Palette, Zap, Smartphone, Globe, Code, Users } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Visual Design',
    description: 'Drag and drop elements to create beautiful layouts without any coding knowledge.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance ensures your websites load quickly and run smoothly.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'All templates are fully responsive and look perfect on any device.',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  },
  {
    icon: Globe,
    title: 'SEO Optimized',
    description: 'Built-in SEO tools help your website rank higher in search results.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    icon: Code,
    title: 'Custom Code',
    description: 'Add custom HTML, CSS, and JavaScript for advanced functionality.',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team in real-time on the same project.',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
];

export function FeaturesSection() {
  return (
    <div
      style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative',
      }}
    >
      <Container size="lg">
        <Stack align="center" gap="xl" mb="4rem">
          <Title
            order={2}
            size="3rem"
            fw={700}
            ta="center"
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Everything You Need to Build
          </Title>
          <Text
            size="xl"
            c="dimmed"
            ta="center"
            style={{ maxWidth: '600px', lineHeight: 1.6 }}
          >
            Powerful features that make website building simple, fast, and enjoyable for everyone.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {features.map((feature, index) => (
            <Card
              key={index}
              p="xl"
              radius="lg"
              style={{
                border: '1px solid #e2e8f0',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <Stack gap="md">
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <feature.icon size={28} color="white" />
                </div>

                <Title order={3} size="h4" fw={600} c="dark">
                  {feature.title}
                </Title>

                <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}