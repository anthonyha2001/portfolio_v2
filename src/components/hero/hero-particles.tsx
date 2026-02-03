'use client';

import Particles from 'react-tsparticles';

export function HeroParticles() {
  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 pointer-events-none"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: ['#0D9AFD', '#1C2343'] },
          opacity: {
            value: 0.12,
            random: { enable: true, minimumValue: 0.05 },
            animation: { enable: true, speed: 0.2, minimumValue: 0.05, sync: false },
          },
          size: {
            value: 2,
            random: { enable: true, minimumValue: 1 },
          },
          links: {
            enable: true,
            distance: 120,
            color: '#0D9AFD',
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: false,
            straight: false,
            outModes: { default: 'out' },
          },
        },
        detectRetina: true,
      }}
    />
  );
}


