import React from 'react';
import { Container, Stack, Title, Text, Button, Group } from '@mantine/core';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <div
      style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      <Container size="lg" style={{ position: 'relative', zIndex: 2 }}>
        <Stack align="center" gap="xl" ta="center">
          {/* Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'glow 2s ease-in-out infinite alternate',
            }}
          >
            <Sparkles size={36} color="white" />
          </div>

          {/* Headline */}
          <Title
            order={2}
            size="3rem"
            fw={700}
            c="white"
            style={{
              maxWidth: '700px',
              lineHeight: 1.2,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            Ready to Build Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dream Website
            </span>
            ?
          </Title>

          {/* Subtitle */}
          <Text
            size="xl"
            c="rgba(255, 255, 255, 0.8)"
            style={{
              maxWidth: '500px',
              lineHeight: 1.6,
            }}
          >
            Join thousands of creators who are already building amazing websites with our platform.
          </Text>

          {/* CTA Button */}
          <Button
            size="xl"
            leftSection={<ArrowRight size={24} />}
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: 600,
              borderRadius: '50px',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.3)';
            }}
          >
            Start Building Now
          </Button>

          {/* Trust Indicators */}
          <Group gap="xl" mt="xl">
            <Text size="sm" c="rgba(255, 255, 255, 0.6)">
              ✨ No credit card required
            </Text>
            <Text size="sm" c="rgba(255, 255, 255, 0.6)">
              🚀 Get started in 30 seconds
            </Text>
            <Text size="sm" c="rgba(255, 255, 255, 0.6)">
              💯 Free forever plan
            </Text>
          </Group>
        </Stack>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
            100% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8); }
          }
        `}
      </style>
    </div>
  );
}