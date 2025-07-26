import React from 'react';
import { Container, Stack, Title, Text, Button, Group, Grid } from '@mantine/core';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { BlobGraphic } from '../BlobGraphic/BlobGraphic';
import { FloatingElements } from '../FloatingElements/FloatingElements';

interface HeroSectionProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export function HeroSection({ onGetStarted, onWatchDemo }: HeroSectionProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px', // Account for fixed header
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
        <Grid align="center" gutter="xl">
          {/* Left Column - Content */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              {/* Badge */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: 'fit-content',
                }}
              >
                <Sparkles size={16} color="white" />
                <Text size="sm" c="white" fw={500}>
                  Build Beautiful Websites in Minutes
                </Text>
              </div>

              {/* Main Headline */}
              <Title
                order={1}
                size="3.5rem"
                fw={700}
                c="white"
                style={{
                  lineHeight: 1.1,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                Create Stunning{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Websites
                </span>{' '}
                Without Code
              </Title>

              {/* Subtitle */}
              <Text
                size="xl"
                c="rgba(255, 255, 255, 0.9)"
                style={{
                  lineHeight: 1.6,
                  maxWidth: '500px',
                }}
              >
                The most intuitive drag-and-drop website builder. Design, customize, and publish 
                professional websites with our powerful visual editor.
              </Text>

              {/* CTA Buttons */}
              <Group gap="md" mt="md">
                <Button
                  size="lg"
                  leftSection={<ArrowRight size={20} />}
                  onClick={onGetStarted}
                  style={{
                    background: 'white',
                    color: '#6366f1',
                    border: 'none',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Get Started Free
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  leftSection={<Play size={20} />}
                  onClick={onWatchDemo}
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Watch Demo
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Right Column - Blob Graphic with Floating Elements */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: '400px',
                position: 'relative',
              }}
            >
              <BlobGraphic 
                primaryColor="#fbbf24" 
                secondaryColor="#f59e0b"
                size={450}
              />
              <FloatingElements containerSize={450} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}
      </style>
    </div>
  );
}